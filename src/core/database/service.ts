import { Team } from "./model/Team";

export const ifTeam = async (teamName: string): Promise<boolean> => {
  const team = await Team.find({ name: teamName });

  if (team) {
    return true;
  }

  return false;
};

export const saveTeam = async (teamName: string): Promise<void> => {
  console.log(teamName);

  try {
    const team = new Team({
      name: teamName,
    });
    await team.save();
  } catch (e) {
    console.log(e);
  }
};
