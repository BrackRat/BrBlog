export function formatUnixTimestamp(unixTimestamp:number):string {
    const date = new Date(unixTimestamp * 1000); // 将秒转换为毫秒

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export function formatUnixTimestampEasy(unixTimestamp:number):string {
    const date = new Date(unixTimestamp * 1000); // 将秒转换为毫秒

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${month}/${day}`;
}
