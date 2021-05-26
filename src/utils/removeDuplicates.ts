export default function removeDuplicates(
  arrayToReduce: Array<any>,
  fieldToReduce: any,
): Array<any> {
  const setObj = new Set();
  const fieldtoReduce = fieldToReduce;

  const reducedArray = arrayToReduce.reduce((acc, local) => {
    if (!setObj.has(fieldtoReduce)) {
      console.log(acc[fieldtoReduce]);
      console.log(local);

      setObj.add(fieldToReduce, local);
      acc.push({ fieldtoReduce: acc.fieldtoReduce });
    }
    return acc;
  }, []);

  return reducedArray || [];
}
