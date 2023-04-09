// 召唤师实例
interface Monster {
	id: string;
  mid: string;
  name: string;
  wild: boolean;
  skills: string[]
}

interface MonsterInintail {
  id: string;
  name: string;
  requiredSkills: string[];
  optionalSkills: string[];
}



