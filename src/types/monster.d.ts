// 召唤师实例
interface Monster {
	id: string;
  mid: number;
  name: string;
  wild: boolean;
  skills: number[]
}

interface MonsterInintail {
  id: number;
  name: string;
  requiredSkills: number[];
  optionalSkills: number[];
}



