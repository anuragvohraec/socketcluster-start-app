import { Utils } from "./utils";


const COUCHDB_PASSWORD = process.env.COUCHDB_PASSWORD|| undefined;
const COUCHDB_USERNAME = process.env.COUCHDB_USERNAME|| undefined;
const COUCHDB_URL=process.env.COUCHDB_URL;

export class DBServerConstants{
    static readonly db_domain_name=COUCHDB_URL;//"http://localhost:59840";//For local Dev
    private static _auth_header:string;

    static get_authorization_header(){
        if(!this._auth_header){
            let t = `${COUCHDB_USERNAME+":"+COUCHDB_PASSWORD}`;
            this._auth_header = `Basic ${Utils.btoa(t)}`;//`Basic ${Utils.btoa("admin:Rmza5huymq08uz3DKo79")}`;//For local dev
        }
        return this._auth_header;
    }

}