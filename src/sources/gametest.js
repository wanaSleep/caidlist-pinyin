import { createServer } from 'net';
import { pEvent } from 'p-event';
import { QuickJSDebugProtocol, QuickJSDebugSession } from 'quickjs-debugger';
import {
    cachedOutput,
    sleepAsync,
    filterObjectMap,
    isExtendFrom,
    isArraySetEqual,
    sortObjectKey,
    stringComparator,
    kvArrayToObject,
    pause
} from '../util/common.js';
import {
    newAdbClient,
    getAnyOnlineDevice,
    waitForAnyDevice,
    adbShell
} from '../util/adb.js';
import doWSRelatedJobsCached from './wsconnect.js';

/**
 * Only used in QuickJSDebugSession.evaluate
 * @type {import("mojang-minecraft")}
 */
const Minecraft = {};

function parseOrThrow(result) {
    if (typeof result === 'string') {
        return JSON.parse(result);
    }
    throw result;
}

/**
 * @template {string | number} StateName
 * @template {string | number | boolean} StateType
 * @param {Record<StateName,StateType[]>} stateValues 属性可取值列表
 * @param {Record<StateName,StateType>[]} states 最小项列表
 * @param {Record<StateName,StateType>[]} invalidStates 无关项列表（最简状态组列表）
 * @returns {Record<StateName,StateType>[]} 最简状态组列表
 */
function simplifyState(stateValues, states, invalidStates) {
    // 下一代迭代状态组列表
    const updateStates = states.slice();
    // 循环每个属性
    for (const [propName, propValues] of Object.entries(stateValues)) {
        // isExtendFrom(o, p) 可以简单粗暴地认为 o 代表的最小项集合 包含于 p 代表的最小项集合
        // 在此我们定义 o 是 p 的子状态组，而 p 是 o 的父状态组

        // 一个表，键是公共状态组，值是除去当前属性外公共状态组的父状态组列表
        // 一个状态组可以重复出现在不同的父状态组列表中
        // 由于属性遍历在最外层，因此此时所有的状态组（最小项）都必然持有当前属性
        // 所以只要父状态组列表中出现当前属性的值都来了一遍
        // 那说明公共状态组就是父状态组列表中所有状态简化的结果
        // 退一步说，就算真的有星际码农往里面传的不是最小项而是有重叠的状态组
        // 导致某个状态已经被合并过不存在这个属性（即【任意值】）
        // 那请看下文
        const parentMap = new Map();
        // 遍历所有状态组
        for (const state of updateStates) {
            // 去除当前属性的状态组（即当前属性可为任何值的状态组）
            const stateWithoutProp = filterObjectMap(state, (k) => k !== propName);
            // 从公共状态组中寻找 stateWithoutProp 子状态组们
            let foundParents = [...parentMap.keys()].filter((parent) => isExtendFrom(parent, stateWithoutProp));
            if (!foundParents.length) {
                // 很显然，到这里没有找到任何一个公共状态组，使得 stateWithoutProp 是它的父状态组
                // 不过没关系，我们可以把 stateWithoutProp 当成公共状态组
                // 之后找一找新的公共状态组（stateWithoutProp）的父状态组
                // 感谢 parentMap，父状态组的父状态组还是父状态组
                // 只要在 parentMap 中找到某个键是新的公共状态组的父状态组
                // 那么它的值肯定都是新的公共状态组的父状态组
                // 我他妈好像忘记去重了 不过不影响
                const foundValues = [...parentMap.keys()]
                    .filter((parent) => isExtendFrom(stateWithoutProp, parent))
                    .map((key) => parentMap.get(key))
                    .flat(1);
                // 加进去了，好耶
                // 所以 parentMap 的键不存在说靠前的公共状态组是靠后的公共状态组的父状态组的情况
                foundParents = [stateWithoutProp];
                parentMap.set(stateWithoutProp, foundValues);
            }
            for (const parent of foundParents) {
                // 把自己这个状态组加到父状态组列表里去
                const foundValues = parentMap.get(parent);
                foundValues.push(state);
            }
        }
        // 清空状态组列表
        updateStates.length = 0;
        // 未被合并的状态组列表
        const primeStates = [];
        for (const [parent, childStates] of parentMap.entries()) {
            // 一个集合，用来验证是不是该有的值都有了
            const validValues = new Set(propValues);
            // 从无关项列表中找到所有除去当前属性外的公共状态组的父状态组
            const invalidChildren = invalidStates.filter((state) => {
                // 去除当前属性的状态组（即当前属性可为任何值的状态组）
                const stateWithoutProp = filterObjectMap(state, (k) => k !== propName);
                // 是公共状态组的父状态组了
                return isExtendFrom(parent, stateWithoutProp);
            });
            // 检查是否该有的值都有了
            // childStates 中重复的值不影响
            // 接上文，如果出现任意值，就表示所有值都出现过了，因此直接清空
            // invalidChildren 中不可能出现任意值，因为无关项列表与最小项列表不可重叠
            childStates
                .concat(invalidChildren)
                .forEach((state) => {
                    if (propName in state) {
                        validValues.delete(state[propName]);
                    } else {
                        validValues.clear();
                    }
                });
            if (validValues.size > 0) {
                // 不是全都有
                primeStates.push(...childStates);
            } else {
                updateStates.push(parent);
            }
        }
        for (const primeState of primeStates) {
            // 确认一下这个状态组是否已经被合并掉了
            // 顺带去个重（我怎么感觉这个才是重点）
            // 应该可以替换成标记的形式？
            if (!updateStates.find((state) => isExtendFrom(primeState, state))) {
                updateStates.push(primeState);
            }
        }
    }
    return updateStates;
}

function listAllState(stateValues) {
    const loopFields = Object.entries(stateValues).map(([propName, propValues]) => ({
        name: propName,
        validValues: propValues,
        loopIndex: 0,
        loopCount: propValues.length
    }));
    const result = [];
    for (;;) {
        const state = {};
        for (const loopField of loopFields) {
            const value = loopField.validValues[loopField.loopIndex];
            state[loopField.name] = value;
        }
        result.push(state);
        let cursor = loopFields.length - 1;
        while (cursor >= 0) {
            const loopField = loopFields[cursor];
            loopField.loopIndex += 1;
            if (loopField.loopIndex < loopField.loopCount) {
                break;
            } else {
                loopField.loopIndex = 0;
                cursor -= 1;
            }
        }
        if (cursor < 0) break;
    }
    return result;
}

function testResultValid(stateValues, result, states, invalidStates) {
    const allStates = listAllState(stateValues);
    const resultStates = [];
    for (const stateCondition of result) {
        const satisifiedStates = allStates.filter((state) => isExtendFrom(state, stateCondition));
        resultStates.push(...satisifiedStates.filter((state) => !resultStates.includes(state)));
    }
    const isEqual = (a, b) => isExtendFrom(a, b) && isExtendFrom(b, a);
    const isInclusive = states.every((state) => resultStates.find((e) => isEqual(e, state)));
    const stateAndInvalid = states.concat(invalidStates);
    const isExclusive = resultStates.every((state) => stateAndInvalid.find((e) => isEqual(e, state)));
    return isInclusive && isExclusive;
}

function simplifyStateAndCheck(stateValues, tagStates, invalidStates) {
    const simplifiedState = simplifyState(stateValues, tagStates, invalidStates);
    if (!testResultValid(stateValues, simplifiedState, tagStates, invalidStates)) {
        throw new Error('Simplified failed');
    }
    return simplifiedState;
}

const Extractors = [
    {
        name: 'commands',
        async extract(target, frame) {
            target.commands = parseOrThrow(await frame.evaluate(() => {
                const player = [...Minecraft.world.getPlayers()][0];
                const helpMeta = player.runCommand('help');
                const result = helpMeta.body.split('\n');
                for (let i = helpMeta.page + 1; i <= helpMeta.pageCount; i++) {
                    const data = player.runCommand(`help ${i}`);
                    result.push(...data.body.split('\n'));
                }
                return JSON.stringify(result);
            }));
        }
    },
    {
        name: 'blocks',
        async extract(target, frame) {
            const blockInfoList = parseOrThrow(await frame.evaluate(() => {
                const blockTypes = Minecraft.MinecraftBlockTypes.getAllBlockTypes();
                const player = [...Minecraft.world.getPlayers()][0];
                const playerPos = player.location;
                const playerBlockPos = new Minecraft.BlockLocation(playerPos.x, playerPos.y, playerPos.z);
                const currentBlock = player.dimension.getBlock(playerBlockPos);
                const originPermutation = currentBlock.permutation;
                const result = {};
                for (const blockType of blockTypes) {
                    const states = [];
                    const invalidStates = [];
                    const { canBeWaterlogged } = blockType;
                    const basePermutation = blockType.createDefaultBlockPermutation();
                    const properties = basePermutation.getAllProperties().map((property) => ({
                        name: property.name,
                        validValues: property.validValues.slice(),
                        defaultValue: property.value
                    }));
                    const loopFields = properties.map((property) => ({
                        ...property,
                        loopIndex: 0,
                        loopCount: property.validValues.length
                    }));
                    for (;;) {
                        const permutation = basePermutation.clone();
                        const state = {};
                        for (const loopField of loopFields) {
                            const value = loopField.validValues[loopField.loopIndex];
                            state[loopField.name] = value;
                        }
                        let applicable = false;
                        try {
                            for (const property of permutation.getAllProperties()) {
                                property.value = state[property.name];
                            }
                            applicable = true;
                        } catch (err) {
                            invalidStates.push(state);
                        }
                        console.log(`Dumping ${blockType.id}${JSON.stringify(state)}`);
                        if (applicable) {
                            const tags = permutation.getTags().slice();
                            const components = [];
                            states.push({ state, tags, components });
                        }
                        let cursor = loopFields.length - 1;
                        while (cursor >= 0) {
                            const loopField = loopFields[cursor];
                            loopField.loopIndex += 1;
                            if (loopField.loopIndex < loopField.loopCount) {
                                break;
                            } else {
                                loopField.loopIndex = 0;
                                cursor -= 1;
                            }
                        }
                        if (cursor < 0) break;
                    }
                    result[blockType.id] = { properties, states, invalidStates, canBeWaterlogged };
                }
                currentBlock.setPermutation(originPermutation);
                return JSON.stringify(result);
            }));
            const blocks = {};
            const blockProperties = {};
            const blockTags = {};
            for (const [blockId, blockType] of Object.entries(blockInfoList).sort(stringComparator)) {
                const { properties, states, invalidStates, canBeWaterlogged } = blockType;
                const tagMap = {};
                const stateValues = kvArrayToObject(properties.map((e) => [e.name, e.validValues]));
                blocks[blockId] = {
                    properties,
                    invalidStates: simplifyStateAndCheck(stateValues, invalidStates, []),
                    canBeWaterlogged
                };
                for (const property of properties) {
                    let propertyDescriptors = blockProperties[property.name];
                    if (!propertyDescriptors) {
                        propertyDescriptors = blockProperties[property.name] = [];
                    }
                    let propertyDescriptor = propertyDescriptors.find(
                        (e) => isArraySetEqual(e.validValues, property.validValues)
                    );
                    if (!propertyDescriptor) {
                        propertyDescriptors.push(propertyDescriptor = {
                            validValues: property.validValues,
                            defaultValue: {}
                        });
                    }
                    propertyDescriptor.defaultValue[blockId] = property.defaultValue;
                }
                for (const state of states) {
                    for (const tag of state.tags) {
                        let tagList = tagMap[tag];
                        if (!tagList) {
                            tagList = tagMap[tag] = [];
                        }
                        tagList.push(state.state);
                    }
                }
                for (const [tagName, tagStates] of Object.entries(tagMap)) {
                    const simplifiedState = simplifyStateAndCheck(stateValues, tagStates, invalidStates);
                    let tagInfo = blockTags[tagName];
                    if (!tagInfo) {
                        tagInfo = blockTags[tagName] = {};
                    }
                    if (simplifiedState.length === 1) {
                        [tagInfo[blockId]] = simplifiedState;
                    } else {
                        tagInfo[blockId] = simplifiedState;
                    }
                }
            }
            target.blocks = blocks;
            target.blockProperties = sortObjectKey(blockProperties);
            target.blockTags = sortObjectKey(blockTags);
        }
    },
    {
        name: 'items',
        async extract(target, frame) {
            const ItemInfoList = parseOrThrow(await frame.evaluate(() => {
                const result = {};
                for (const itemType of Minecraft.ItemTypes.getAll()) {
                    const itemStack = new Minecraft.ItemStack(itemType);
                    const components = itemStack.getComponents()
                        .map((component) => component.constructor.id);
                    result[itemType.id] = { components };
                }
                return JSON.stringify(result);
            }));
            const items = Object.keys(ItemInfoList).sort();
            target.items = items;
        }
    },
    {
        name: 'entities',
        async extract(target, frame) {
            const EntityInfoList = parseOrThrow(await frame.evaluate(() => {
                const result = {};
                for (const entityType of Minecraft.EntityTypes.getAll()) {
                    result[entityType.id] = {};
                }
                return JSON.stringify(result);
            }));
            const entities = Object.keys(EntityInfoList).sort();
            target.entities = entities;
        }
    }
];

const ImportEnvironments = {
    Minecraft: ['Minecraft', 'mojang-minecraft', '@minecraft/server'],
    GameTest: ['GameTest', 'mojang-gametest', '@minecraft/server-gametest'],
    MinecraftUI: ['mojang-minecraft-ui', '@minecraft/server-ui'],
    MinecraftServerAdmin: ['mojang-minecraft-server-admin', '@minecraft/server-admin'],
    MinecraftNet: ['mojang-minecraft-net', '@minecraft/server-net']
};
/**
 * @param {QuickJSDebugSession} session
 */
async function evaluateExtractors(cx, target, session) {
    const { coreVersion } = cx;
    await session.pause();
    const topFrame = await session.getTopStack();
    await topFrame.evaluate((envKeys) => {
        Promise.allSettled(envKeys.map(
            ([keyName, moduleNames]) => Promise.allSettled(moduleNames.map(
                (moduleName) => import(moduleName)
            )).then((resolutions) => {
                const found = resolutions.find((e) => e.status === 'fulfilled');
                if (found) {
                    globalThis[keyName] = found.value;
                }
            })
        )).then(() => {
            console.info('PREPARE_ENV_OK');
        });
    }, [...Object.entries(ImportEnvironments)]);
    await Promise.all([
        pEvent(session, 'log', (ev) => ev.message === 'PREPARE_ENV_OK'),
        session.continue()
    ]);
    await session.pause();
    for (const extractor of Extractors) {
        if (extractor.match && !extractor.match(coreVersion)) continue;
        await extractor.extract(target, topFrame, session, cx);
    }
    await session.continue();
}

export default async function analyzeGameTestEnumsCached(cx) {
    const { version, packageVersion } = cx;
    const cacheId = `version.${version}.gametest.all`;
    const cache = cachedOutput(cacheId);
    if (cache && packageVersion === cache.packageVersion) return cache;

    console.log('Connecting ADB host...');
    const adbClient = newAdbClient();
    console.log('Connecting to device...');
    let device = await getAnyOnlineDevice(adbClient);
    if (!device) {
        console.log('Please plug in the device...');
        device = await waitForAnyDevice(adbClient);
    }
    await pause('Please switch to branch: gametest\nInteract if the device is ready');

    const server = createServer();
    server.listen(0);
    const socketPromise = pEvent(server, 'connection');
    await device.reverse('tcp:19144', `tcp:${server.address().port}`);
    await adbShell(device, 'input keyevent 48'); // KEYCODE_T
    await sleepAsync(500);
    await adbShell(device, `input text ${JSON.stringify('/script debugger connect 127.0.0.1 19144')}`);
    await adbShell(device, 'input keyevent 66'); // KEYCODE_ENTER
    const socket = await socketPromise;
    const protocol = new QuickJSDebugProtocol(socket);
    const session = new QuickJSDebugSession(protocol);
    const target = { packageVersion };
    await evaluateExtractors(cx, target, session);
    await doWSRelatedJobsCached(cx, device, {});
    protocol.close();
    server.close();
    return cachedOutput(cacheId, target);
}
