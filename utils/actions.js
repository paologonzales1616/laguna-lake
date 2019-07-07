export const FEATURE_SELECT = value => {
  switch (value) {
    case "pH":
      return "pH";
    case "ammonia":
      return "Ammonia";
    case "nitrate":
      return "Nitrate";
    case "inorganic_phosphate":
      return "Inorganic Phosphate";
    case "dissolved_oxygen":
      return "Dissolved Oxygen";
    case "fecal_coliforms":
      return "Fecal Coliforms";
    case "wqi":
      return "Water Quality Index";
    case "BOD":
      return "BOD Level";
    default:
      return "Water Quality Index";
  }
};
