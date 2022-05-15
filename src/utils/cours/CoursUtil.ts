class CoursUtil {
  public static string(cours: number) {
    switch (cours) {
      case 1:
        return "冬アニメ";
      case 2:
        return "春アニメ";
      case 3:
        return "夏アニメ";
      case 4:
        return "秋アニメ";
    }
  }
}

export default CoursUtil;
