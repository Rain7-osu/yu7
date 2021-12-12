/*
 * 示例 调用 services 接口的文件
 */

export function fetchIncrement(base: number) {
  return Promise.resolve(base + 1);
}
