import { readFile } from 'fs/promises';
import Life from '../src/life.js'

global.json = async fileName => JSON.parse(await readFile(`data/${fileName}.json`));

async function debug() {

    const life = new Life();
    await life.initial();

    life.restart({
        CHR: 5,                     // 颜值 charm CHR
        SKL: 5,                     // 技术 skill SKL
        STR: 5,                     // 体质 strength STR
        INT: 5,                     // 球商 intelligence INT
        SPR: 5,                     // 快乐 spirit SPR
        TLT: [1004, 1005, 1009],    // 天赋 talent TLT
    });
    const lifeTrajectory = [];
    let trajectory;
    do{
        try{
            trajectory = life.next();
        } catch(e) {
            console.error(e);
            // debugger
            throw e;
        }
        lifeTrajectory.push(lifeTrajectory);
        const { age, content } = trajectory;
        console.debug(
            `---------------------------------`,
            `\n-- ${age} 岁\n   `,
            content.map(
                ({type, description, rate, name, postEvent}) => {
                    switch(type) {
                        case 'TLT':
                            return `天赋【${name}】发动：${description}`;
                        case 'EVT':
                            return description + (postEvent?`\n    ${postEvent}`:'');
                    }
                }
            ).join('\n    ')
        );
    } while(!trajectory.isEnd)
    // debugger;
}

debug();
