import pinyin from 'pinyin'
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import {
    projectPath
} from './util/common.js';
import path from 'path';

console.log(pinyin('你好').join(' '))


const sourceDir = projectPath('output.web','')
const targetDir = projectPath('output.web-pinyin','')
// 遍历目录函数
function traverseDirectory(directory) {
    const files = readdirSync(directory)
    console.log(`Traversing directory: ${directory}`)
    files.forEach(file => {
        const filePath = path.join(directory, file)
        const stats = statSync(filePath)
        if (stats.isDirectory()) {
            // 如果是目录，则递归遍历子目录
            const subDirectory = path.join(targetDir, filePath.substring(sourceDir.length))
            console.log(`Creating directory: ${subDirectory}`)
            if (!existsSync(subDirectory)) {
                mkdirSync(subDirectory, { recursive: true })
            }
            traverseDirectory(filePath);
        } else {
            // 如果是文件，则读取并处理文件，然后复制到目标目录
            if(!filePath.endsWith('.json'))return
            const fileContent = readFileSync(filePath, 'utf8')
            const fileContent_pinyin = pinyin(fileContent).join(' ')
            // 在这里可以对文件内容进行处理
            const targetPath = path.join(targetDir, filePath.substring(sourceDir.length));
            writeFileSync(targetPath, fileContent_pinyin);
            console.log(`Copied file: ${filePath} -> ${targetPath}`)
        }
    });
}

// 开始遍历源目录
traverseDirectory(sourceDir);