import { ToastrService } from 'ngx-toastr';

export class ToastrUtils {

    constructor(
        public toastr: ToastrService,
    ) { }

    toastrMsgUpdateSuccess(msg: string) {
        return this.toastr.success(msg + ' à été modifiée avec succès', 'Success');
    }

    toastrMsgAddSuccess(msg: string) {
        return this.toastr.success(msg + ' à été ajoutée avec succès', 'Success');
    }

    toastrMsgError() {
        return this.toastr.error('Problème survenu...', 'Error');
    }

    toastrMsgErrorAlredayExist(msg: string) {
        return this.toastr.error(msg + ' ne peut pas être ajouté en double', 'Error');
    }

    toastrMsgDeleteSuccess(msg: string) {
        return this.toastr.success(msg + ' à été supprimée avec succès', 'Success');
    }

    toastrMsgErrorDeleteRequest(msg: string) {
        return this.toastr.error(msg + ' ne peut pas être supprimée', 'Error');
    }

}

