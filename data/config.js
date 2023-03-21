import nodePath from 'path';
import { projectRoot } from '../src/util/common.js';
import secret from './secret.js';

// 此部分仅 OCR 需要使用，无需 OCR 则请勿修改
const commonOCROptions = {
    tesseractOptions: {
        // Tesseract 安装路径
        binary: '"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"',
        // 训练数据路径
        'tessdata-dir': nodePath.resolve(projectRoot, 'data/tesstrain/tessdata')
    },
    // 命令区域大小
    commandAreaRect: {
        1: [479, 950, 1650, 125], // <- phone
        3: [410, 950, 1650, 125] // phone ->
    },
    // OCR识别错误手动校正
    tesseractMistakes: {
        '\'n"\'sUmmOn Creeper': '/summon creeper',
        '\'n"\'sUmmOn raVager': '/summon ravager'
    }
};

// const smallerGUIOCROptions = { // GUI Scale = -1
//     ...commonOCROptions,
//     // 命令区域大小
//     commandAreaRect: {
//         1: [397, 976, 1784, 100], // <- phone
//         3: [328, 976, 1784, 100] // phone ->
//     },
//     tesseractMistakes: {
//         '\'/sUmmOn Creeper': '/summon creeper',
//         '\'/sUmmOn raVager': '/summon ravager'
//     }
// };

const smallestGUIOCROptions = { // GUI Scale = -2
    ...commonOCROptions,
    // 命令区域大小
    commandAreaRect: {
        1: [315, 1002, 1920, 75], // <- phone
        3: [246, 1002, 1920, 75] // phone ->
    },
    tesseractMistakes: {
        '\'/summon Creeper': '/summon creeper',
        '\'/summon ravager': '/summon ravager'
    }
};

const neteaseOCROptions = {
    ...commonOCROptions,
    // 命令区域大小
    commandAreaRect: {
        1: [424, 922, 1660, 100], // <- phone
        3: [424, 922, 1660, 100] // phone ->
    },
    // OCR识别错误手动校正
    tesseractMistakes: {
        '/sUmmOn Creeper': '/summon creeper',
        '/sUmmOn raVager': '/summon ravager'
    }
};

export const packageVersions = {
    // 正式版
    release: {
        // 安装包版本
        version: '1.19.71.02',
        // 安装包路径
        path: 'H:\\BedrockVersions\\Latest\\1.19.71.02.apk',
        config: smallestGUIOCROptions
    },
    // 测试版/预览版
    beta: {
        // 安装包版本
        version: '1.19.80.21',
        // 安装包路径
        path: 'H:\\BedrockVersions\\Latest\\1.19.80.21.apk',
        config: smallestGUIOCROptions
    },
    // 中国版测试版
    netease_dev: {
        // 安装包版本
        version: '2.6beta-221292',
        coreVersion: '1.18.31.0.0',
        // 安装包路径
        path: 'H:\\BedrockVersions\\NeteaseDev\\dev_launcher_2.6.100.221292.apk',
        config: neteaseOCROptions
    },
    // 预览版（Windows 端）
    preview_win: {
        // 应用版本
        version: '1.19.80.21'
    }
};

export const proxyConfig = {
    http: 'http://localhost:7890',
    https: 'http://localhost:7890'
};

// 留 null 表示不使用 token（每小时只允许60次请求）
export const githubToken = secret.githubAccessToken;
