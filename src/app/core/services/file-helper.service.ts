import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class FileHelperService {

  static b64toBlob(b64Data: string, contentType: string, sliceSize: number=1024) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

  return new Blob(byteArrays, {type: contentType});
}

  static async prepareDir(path: string) {

  }

  static async saveBase64(filename:string, content: string ) {
  //   const contentType= 'image/png';
  //   const folderpath = filename.split('/').pop();
  //   const dir = await window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, () => {} );
  //   return await dir.getDirectory(folderpath,{'create':true},function(dir){
  //             dir.getFile(filename, {create:true}, function(file) {
  //                 //console.log("File created succesfully.", file, folderpath,filename);
  //                 file.createWriter(function(fileWriter) {
  //                     fileWriter.write(FileHelperService.b64toBlob(content,contentType));
  //                 }, function(){
  //                     console.log('Unable to save file in path '+ folderpath,filename);
  //                 });
  //             });
  //         },function(err){
  // //            console.log(err,folderpath);
  //         });
  }

}
