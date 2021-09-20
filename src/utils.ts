
export class Utils{
    static btoa(str:string){
        // create a buffer
        const buff = Buffer.from(str, 'utf-8');
        // decode buffer as Base64
        return buff.toString('base64');
    }

     /**
     * * build_path("https://my.com/proxy/db","/some1/db?a=12") > "https://my.com/proxy/db/some1/db?a=12"
     * * build_path("https://my.com/proxy/db/","/some1/db?a=12") > "https://my.com/proxy/db/some1/db?a=12"
     * @param args 
     */
      static build_path(...args:string[]):string{
        return args.map((part, i) => {
            if (i === 0) {
            return part.trim().replace(/[\/]*$/g, '')
            } else {
            return part.trim().replace(/(^[\/]*|[\/]*$)/g, '')
            }
        }).filter(x=>x.length).join('/')
    }

}