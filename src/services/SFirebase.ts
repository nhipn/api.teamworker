import admin, { initializeApp } from "firebase-admin";
import firebaseAccount from "../../firebase_account_service.json";
import dotenv from "dotenv";
import SLog, { LogType } from "./SLog";

export default class SFirebase {
  private static databaseRef: admin.database.Database;

  private static init() {
    if (!this.databaseRef) {
      dotenv.config();

      const databaseURL = process?.env?.FIREBASE_DATABASE || "";

      //init database
      this.databaseRef = admin
        .initializeApp({
          credential: admin.credential.cert(
            firebaseAccount as admin.ServiceAccount
          ),
          databaseURL: databaseURL,
        })
        ?.database();

      SLog.log(
        LogType.Info,
        "Firebase Database",
        "Connected to firebase realtime database",
        (this.databaseRef.app.name as unknown) ?? {}
      );
    }
  }

  public static pushNotification(
    userId: number = -1,
    onSuccess: () => void = () => {},
    onFailure: (error: unknown) => void = () => {},
    onComplete: () => void = () => {}
  ) {
    if (userId < 1) {
      onFailure("Invalid user");
      onComplete();
      return;
    }

    this.init();

    const time = new Date().getTime();
    const path = "USERS/USER_ID:" + userId + "/NOFITICATIONS";
    const ref = this.databaseRef.ref(path);
    ref.set(time, (error) => {
      if (!error) {
        onSuccess();
        onComplete();
      } else {
        onFailure(error);
        onComplete();
      }
    });
  }
}
