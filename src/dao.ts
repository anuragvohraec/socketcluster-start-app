import { DBServerConstants } from "./constants";
import { Utils } from "./utils";
import fetch from 'node-fetch';

export class DAO{

    static async checkCreateDB(dbname:string):Promise<boolean>{
        let checkDB = await fetch(Utils.build_path(DBServerConstants.db_domain_name,`/${dbname}`),{
            headers: {"Authorization": DBServerConstants.get_authorization_header()},
            method: "HEAD"
        });
        if(checkDB.status!==200){
            if(checkDB.status === 404){
                //lets create DB
                let createDB = await fetch(Utils.build_path(DBServerConstants.db_domain_name,`/${dbname}`),{
                    headers: {"Authorization": DBServerConstants.get_authorization_header()},
                    method: "PUT"
                });
                if(createDB.status === 201){
                    return true;
                }else{
                    console.error(createDB.status, createDB.statusText, await createDB.text());
                    return false;
                }
            }else{
                console.error(checkDB.status, checkDB.statusText, await checkDB.text());
                return false;
            }
        }else{
            return true;
        }
    }

    static async bulkUpdateDoc(dbname:string, bulkDocs:Record<string,any>[],new_edits:boolean):Promise<boolean>{
        let doc:any = {docs:bulkDocs};
        if(!new_edits){
            doc.new_edits = false;
        }
        let res = await fetch(Utils.build_path(DBServerConstants.db_domain_name,`/${dbname}/_bulk_docs`),{
            headers: {"Content-Type":"application/json", "Authorization": DBServerConstants.get_authorization_header()},
            method: "POST",
            body: JSON.stringify(doc)
        });
        if(res.status === 201){
            return true;
        }else{
            return false;
        }
    }

    static async checkADoc(dbname:string, docid:string){
        let res = await fetch(Utils.build_path(DBServerConstants.db_domain_name,`/${dbname}/${docid}`),{
            headers: {"Authorization": DBServerConstants.get_authorization_header()},
            method: "HEAD"
        });
        if(res.status ===200){
            return true
        }else{
            console.error(res.status, res.statusText, await res.text());
            return false;
        }
    }

    static async postADoc(dbname:string, doc:any){
        let res = await fetch(Utils.build_path(DBServerConstants.db_domain_name,`/${dbname}`),{
            headers: {"Content-Type":"application/json", "Authorization": DBServerConstants.get_authorization_header()},
            method: "POST",
            body: JSON.stringify(doc)
        });
        if(res.status ===201){
            return await res.json() as {id:string, rev:string};
        }else{
            console.error(res.status, res.statusText, await res.text());
            return;
        }
    }

    static async postAQuery<T>(dbname: string, selector: any, limit?: number):Promise<T[]|undefined>{
        let res = await fetch(Utils.build_path(DBServerConstants.db_domain_name,`/${dbname}/_find`),{
            headers: {"Content-Type":"application/json", "Authorization": DBServerConstants.get_authorization_header()},
            method: "POST",
            body: JSON.stringify({
                selector,limit
            })
        });
        if(res.status ===200){
            let d = await res.json();
            return d.docs as T[];
        }else{
            console.error(res.status, res.statusText, await res.text());
            return;
        }
    }

    static async readADoc<T>(dbname: string, docid:string):Promise<T|undefined>{
        let res = await fetch(Utils.build_path(DBServerConstants.db_domain_name,`/${dbname}/${docid}`),{
            headers: {"Authorization": DBServerConstants.get_authorization_header()},
            method: "GET"
        });
        if(res.status ===200){
            let d = await res.json();
            return d.docs as T;
        }else{
            console.error(res.status, res.statusText, await res.text());
            return;
        }
    }
}