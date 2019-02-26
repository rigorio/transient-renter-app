import {HttpHeaders} from "@angular/common/http";

export class Host {
  // public static host = "https://gentle-stream-26956.herokuapp.com";
  public static host = "http://localhost:8080";
  // public static host = "http://10.0.2.2";
  public static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
}
