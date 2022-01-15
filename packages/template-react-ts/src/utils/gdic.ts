const getDestructArrayInCondition =
  <T = any>(condition: any, thing: T): [T] | [] => {
    return condition ? [thing] : [];
  };

const getDestructObjectInCondition =
  <T = any>(condition: boolean, thing: Record<any, T>) => {
    return condition ? thing : {};
  };

export const gdaic = getDestructArrayInCondition;
export const gdoic = getDestructObjectInCondition;
