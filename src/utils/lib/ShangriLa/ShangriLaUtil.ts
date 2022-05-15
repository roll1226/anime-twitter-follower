import { Anime, Cours } from "types/shangriLa";
import LoggerUtil from "utils/debugger/LoggerUtil";
import GroupByUtil from "utils/groupBy/GroupByUtil";

class ShangriLaUtil {
  static apiUrl = "http://api.moemoe.tokyo/anime/v1/master";

  public static async fetchCours() {
    const res = await fetch(`${ShangriLaUtil.apiUrl}/cours`);
    const json = await res.json();
    const coursJson: Cours[] = Object.keys(json).map((key) => {
      return json[key];
    });

    const coursGroupByYear = GroupByUtil.groupBy(coursJson, (i) => i.year);
    const cours = Object.keys(coursGroupByYear).map((key) => {
      return coursGroupByYear[Number(key)];
    });

    return cours.reverse();
  }

  public static async fetchYearAndCours(year: string, cours: string) {
    const res = await fetch(`${ShangriLaUtil.apiUrl}/${year}/${cours}?ogp=1`);
    return (await res.json()) as Anime[];
  }
}

export default ShangriLaUtil;
