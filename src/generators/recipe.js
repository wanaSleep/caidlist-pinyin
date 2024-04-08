import { forEachObject } from '../util/common.js';

function toArray(arrOrNot) {
    return Array.isArray(arrOrNot) ? arrOrNot : [arrOrNot];
}

const MinecraftNamespacePrefix = 'minecraft:';
function removeMinecraftNamespace(str) {
    if (str.startsWith(MinecraftNamespacePrefix)) {
        return str.slice(MinecraftNamespacePrefix.length);
    }
    return str;
}

export function itemToString(item) {
    if (typeof item === 'string') {
        return removeMinecraftNamespace(item);
    }
    let result;
    if (item.item) {
        result = removeMinecraftNamespace(item.item);
    } else {
        result = `tag:${removeMinecraftNamespace(item.tag)}`;
    }
    result = result.replace(/[-+=<>]/g, '_');
    if (item.data !== undefined) {
        result = `${result}:${item.data}`;
    }
    if (item.count && item.count > 1) {
        result = `${result}*${item.count}`;
    }
    return result;
}

export const RecipeDataParser = {
    'minecraft:recipe_brewing_mix': (json) => {
        const input = removeMinecraftNamespace(json.input);
        const reagent = removeMinecraftNamespace(json.reagent);
        const output = removeMinecraftNamespace(json.output);
        const method = json.tags;
        return `<${method.join('/')}>${input}+${reagent}->${output}`;
    },
    'minecraft:recipe_brewing_container': (json) => {
        const input = removeMinecraftNamespace(json.input);
        const reagent = removeMinecraftNamespace(json.reagent);
        const output = removeMinecraftNamespace(json.output);
        const method = json.tags;
        return `<${method.join('/')}>${input}+${reagent}->${output}`;
    },
    'minecraft:recipe_furnace': (json) => {
        const input = itemToString(json.input);
        const output = itemToString(json.output);
        const method = json.tags;
        return `<${method.join('/')}>${input}->${output}`;
    },
    'minecraft:recipe_material_reduction': (json) => {
        const input = toArray(json.input).map((e) => itemToString(e));
        const output = toArray(json.output).map((e) => itemToString(e));
        const method = json.tags;
        return `<${method}>${input.join('+')}->${output.join('+')}`;
    },
    'minecraft:recipe_shaped': (json) => {
        const patternCount = {};
        json.pattern.forEach((row) => {
            row.split('').forEach((slot) => {
                if (slot in patternCount) {
                    patternCount[slot]++;
                } else {
                    patternCount[slot] = 1;
                }
            });
        });
        forEachObject(json.key, (v, k) => {
            v.count = patternCount[k];
        });
        const input = Object.values(json.key).map((e) => itemToString(e));
        const output = toArray(json.result).map((e) => itemToString(e));
        const method = json.tags;
        return `<${method.join('/')}>${input.join('+')}->${output}`;
    },
    'minecraft:recipe_shapeless': (json) => {
        const input = json.ingredients.map((e) => itemToString(e));
        const output = toArray(json.result).map((e) => itemToString(e));
        const method = json.tags;
        return `<${method.join('/')}>${input.join('+')}~>${output}`;
    },
    'minecraft:recipe_smithing_transform': (json) => {
        const input = itemToString(json.base);
        const addition = itemToString(json.addition);
        const output = itemToString(json.result);
        const method = json.tags;
        return `<${method.join('/')}>${input}+${addition}->${output}`;
    },
    'minecraft:recipe_smithing_trim': (json) => {
        const input = itemToString(json.base);
        const addition = itemToString(json.addition);
        const template = itemToString(json.template);
        const method = json.tags;
        return `<${method.join('/')}>${input}<-${addition}+${template}`;
    }
};
