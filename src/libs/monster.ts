import {getRateTrue, getRandomInt, getRandomItems, shuffle, unique} from '../utils';
import monsterData from '../data/monster.json';
import {v4 as uuidV4} from 'uuid';
import {
    MONSTER_FIRST_OPTIONAL_SKILL_RATE,
    MIX_MONSTER_NOT_PARTICIPATE_RATE,
    MONSTER_OPTIONAL_SKILL_RATE,
    MIX_MONSTER_TURTLE_RATE,
    MIX_MONSTER_WILD_RATE,
    MUTEX_SKILLS,
    SKILL_SORT,
} from '../config/constant';

export const initMonster = (id: number) => {
	const monster = monsterData.find((m) => m.id === id) as MonsterInintail;

	const requiredSkills = shuffle(monster.requiredSkills);
	const optionalSkills = shuffle(monster.optionalSkills);

	const skills = sortSkills(
		requiredSkills
			.concat(optionalSkills
				.filter((_, i) =>
					getRateTrue(
						i === 0 ?
							MONSTER_FIRST_OPTIONAL_SKILL_RATE :
							MONSTER_OPTIONAL_SKILL_RATE
					)))
	);

	return {
		id: uuidV4(),
		mid: id,
		name: monster.name,
		wild: false,
		skills,
	};
}

export const mixMonster = (monsters: [Monster, Monster]) => {
    if (getRateTrue(MIX_MONSTER_NOT_PARTICIPATE_RATE)) {
        return getRateTrue(MIX_MONSTER_TURTLE_RATE) ? initMonster(1) : initMonster(6);
    }

	const m1 = monsters[0];
	const m2 = monsters[1];

	const m1Init = monsterData.find((m) => m.id === m1.mid) as MonsterInintail;
	const m2Init = monsterData.find((m) => m.id === m2.mid) as MonsterInintail;
	const newMonsterInit = getRateTrue(0.5) ? m1Init : m2Init;

	const requiredSkills = shuffle(newMonsterInit.requiredSkills);

	const allSkills = filterMutexSkills(unique([...m1.skills, ...m2.skills]));

	const optionalSkills = getRandomItems(allSkills, getRandomInt(0, allSkills.length));

	const skills = sortSkills(unique([...requiredSkills, ...optionalSkills]));

	const wild = getRateTrue(MIX_MONSTER_WILD_RATE);

	return {
		id: uuidV4(),
		mid: newMonsterInit.id,
		name: newMonsterInit.name,
		wild,
		skills,
	}
}

// 根据SKILL_SORT排序
export const sortSkills = (skills: number[]) => {
	return skills.sort((a, b) => {
		const aIndex = SKILL_SORT.findIndex((s) => s === a);
		const bIndex = SKILL_SORT.findIndex((s) => s === b);
		return aIndex - bIndex;
	});
}

// 过滤所有互斥技能
export const filterMutexSkills = (skills: number[]) => {
    const mutexSkills = MUTEX_SKILLS.map((s) => s.sort((a, b) => a - b));
    const skillsSort = skills.sort((a, b) => a - b);
    const skillsSet = new Set(skillsSort);
    const mutexSkillsSet = new Set(mutexSkills.map((s) => s.join(',')));
    for (let i = 0; i < skillsSort.length; i++) {
        const skill = skillsSort[i];
        for (let j = i + 1; j < skillsSort.length; j++) {
            const skill2 = skillsSort[j];
            if (mutexSkillsSet.has([skill, skill2].join(','))) {
                skillsSet.delete(skill);
                skillsSet.delete(skill2);
            }
        }
    }
    return Array.from(skillsSet);
}
