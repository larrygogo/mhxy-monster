import {getRandomBool, getRandomInt, getRandomItems, shuffle, unique} from '../utils';
import monsterData from '../data/monster.json';
import {v4 as uuidV4} from 'uuid';
import {MONSTER_FIRST_OPTIONAL_SKILL_RATE, MONSTER_OPTIONAL_SKILL_RATE, SKILL_SORT} from '../config/constant';

export const initMonster = (id: number) => {
	const monster = monsterData.find((m) => m.id === id) as MonsterInintail;

	const requiredSkills = shuffle(monster.requiredSkills);
	const optionalSkills = shuffle(monster.optionalSkills);

	const skills = sortSkills(
		requiredSkills
			.concat(optionalSkills
				.filter((_, i) =>
					getRandomBool(
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
	const m1 = monsters[0];
	const m2 = monsters[1];

	const m1Init = monsterData.find((m) => m.id === m1.mid) as MonsterInintail;
	const m2Init = monsterData.find((m) => m.id === m2.mid) as MonsterInintail;
	const newMonsterInit = getRandomBool(0.5) ? m1Init : m2Init;

	const requiredSkills = shuffle(newMonsterInit.requiredSkills);

	const allSkills = unique([...m1.skills, ...m2.skills]);

	const optionalSkills = getRandomItems(allSkills, getRandomInt(0, allSkills.length));

	const skills = sortSkills(unique([...requiredSkills, ...optionalSkills]))

	const wild = getRandomBool(0.5);

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
