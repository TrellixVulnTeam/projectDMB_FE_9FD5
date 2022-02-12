import { environment } from './../environments/environment';
const PREFIX = environment.API_PREFIX;

export const API = {
     //----------search(get)----------------//
    USERACCOUNT: PREFIX + 'api/userAccount',
    ASSET: PREFIX + 'api/asset',
    EMPLOYEE: PREFIX + 'api/employee',
    EMPLOYEEASSET: PREFIX + 'api/employeeAsset',
    CONFIG: PREFIX + 'api/config',
    LOGIN:PREFIX + 'api/authLogin',
    TYPE:PREFIX + 'api/type',
    BRAND:PREFIX + 'api/brand',
    ASSETMODEL:PREFIX + 'api/assetModel',
    POSITION:PREFIX + 'api/position',
    SITE:PREFIX + 'api/site',
    EMPLOYEETYPE:PREFIX + 'api/typeEm',
    STATUS:PREFIX + 'api/status',
    LISTBRAND:PREFIX + 'api/listBrand',
    EMPLOYEELIST: PREFIX + 'api/listemployee',
    LISTASSET:PREFIX + 'api/listasset',
    LISTASSETFREE:PREFIX + 'api/listassetFree',
    STATUSFREE:PREFIX + 'api/statusFree',
    STATUSUSED:PREFIX + 'api/statusUsed',
    LISTREPAIR:PREFIX + 'api/listrepair',
    LISTSALE:PREFIX + 'api/listsale',

    // search (post) sent
    LISTEMPUSEASSET:PREFIX + 'api/listEmpUseAsset',
    EMPLOYEESEARCHDATE:PREFIX + 'api/getSearchDateEmp',
    EMPDETAIL:PREFIX + 'api/listUseEmp',
    ASSETDETAIL:PREFIX + 'api/listUseAsset',
    LISTDELETEASSET:PREFIX + 'api/listDeleteAsset',
    HISTORYUSEDASSET:PREFIX + 'api/historyUsedAsset',
    CHANGESTATUSASSET:PREFIX + 'api/ChandeStatusAsset',
    EMPUSEASSETNOW:PREFIX + 'api/historyUsedAssetNow',
    SEARCHREPAIR:PREFIX + 'api/repairasset',
    SENTEMAIL:PREFIX + 'api/sentemail',
    WHEREUSERFORGOTPASS:PREFIX + 'api/whereUserforgotpass',
    CHECKOTP:PREFIX + 'api/sentemailOtp',
    CHECKPASSWORD:PREFIX + 'api/checkpassword',
    CHECKCREATEUSER:PREFIX + 'api/checkCreateUser',
    REPORTEMPLOYEE:PREFIX + 'api/employeeReport',
    REPORTASSET:PREFIX + 'api/reportasset',

    //----------create(post)----------------//
    CREATEUSERACCOUNT:PREFIX + 'api/createAccount',
    CREATEEMPLOY:PREFIX + 'api/createEmployee',
    CREATEASSET:PREFIX + 'api/createAsset',
    CREATEPOSITION:PREFIX + 'api/createPosition',
    CREATESITE:PREFIX + 'api/createSite',
    CREATEBRAND:PREFIX + 'api/createBrand',
    CREATEASSETMODEL:PREFIX + 'api/createModel',
    CREATETYPE:PREFIX + 'api/createType',
    CREATETYPEEMTYPE:PREFIX + 'api/createTypeEm',
    CREATETYSTATUS:PREFIX + 'api/createStatus',
    CREATEEMPASSET:PREFIX + 'api/createEmpAsset',
    CREATEHISTORYASSET:PREFIX + 'api/createHistoryasset',
    CREATEREPAIR: PREFIX + 'api/createRepair',
    CREATESALE: PREFIX + 'api/createsale',


    //----------edit(put)----------------//
    PUTPOSITION:PREFIX + 'api/updatePosition/:_id',
    PUTSITE:PREFIX + 'api/updateSite/:_id',
    PUTSTATUS:PREFIX + 'api/updateStatus/:_id',
    PUTBRAND:PREFIX + 'api/updateBrand/:_id',
    PUTASSETMODEL:PREFIX + 'api/updateModelAsset/:_id',
    PUTTYPEASSET:PREFIX + 'api/updateType/:_id',
    PUTTYPEEM:PREFIX + 'api/updateTypeEm/:_id',
    PUTEMPLOYEE:PREFIX + 'api/updateEmployee/:_id',
    PUTASSET:PREFIX + 'api/updateAsset/:_id',
    PUTEMPASSET:PREFIX + 'api/updateEmpAsset/:_id',
    PUTREPAIR: PREFIX + 'api/updateRepair/:_id',
    PUTSALE: PREFIX + 'api/updatesale/:_id',
    EDITEACCOUNT: PREFIX + 'api/updateAccount/:_id',
    FORGOTPASS: PREFIX + 'api/forgotpassword',
    EDITPASSWORD: PREFIX + 'api/editpassword',


     //----------delete(delete)----------------//
     DELETEPOSITION:PREFIX + 'api/deletePosition/:_id',
     DELETESITE:PREFIX + 'api/deleteSite/:_id',
     DELETEBRAND:PREFIX + 'api/deleteBrand/:_id',
     DELETESTATUS:PREFIX + 'api/deleteStatus/:_id',
     DELETEASSETMODEL:PREFIX + 'api/deleteModelAsset/:_id',
     DELETETYPEASSET:PREFIX + 'api/deleteType/:_id',
     DELETETYPEEM:PREFIX + 'api/deleteTypeEm/:_id',
     DELETEEMPLOYEE:PREFIX + 'api/deleteEmployee/:_id',
     DELETEASSET:PREFIX + 'api/deleteAsset/:_id',
     DELETEEMPASSET:PREFIX + 'api/deleteEmpAsset/:_id',
     DELETEREPAIR:PREFIX + 'api/deleteRepair/:_id',
     DELETESALE:PREFIX + 'api/deletesale/:_id',
     DELETEACCOUNT:PREFIX + 'api/deleteAccount/:_id',

//----------project------------------//
  CREATEACCOUNTIMG:PREFIX + 'api/createFileImg',
  CREATELIKEUSER:PREFIX + 'api/createLikeUser',
  LISTLIKEUSER:PREFIX + 'api/listLikeUser',

}

