import http from "../services/http-common";
class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file",file);
    return http.post("/upload", formData, (new URLSearchParams({user:''}).toString), {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }
  getFiles() {
    return http.get("/upload");
  }
  
}
export default new UploadFilesService();

