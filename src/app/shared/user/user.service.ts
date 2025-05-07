import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../../model/user.model';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  dbPath: string = "/users"
  userRef: AngularFirestoreCollection<User>

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    this.userRef = db.collection(this.dbPath)
  }

  register(data: any) {
    this.spinner.show()
    this.auth.createUserWithEmailAndPassword(data.email, data.password).then(
      (res: any) => {
        this.spinner.hide()
        delete data.password
        data.uid = res.user.uid
        data.createdAt = Date.now()
        data.status = true
        data.userType = 2
        
        this.addUser(data)
      },
      (err) => {
        this.spinner.hide()
        console.log("Error in Creating User", err);
        this.toastr.error(err.message)
      }
    )
  }

  addUser(data: any) {
    this.spinner.show()
    this.userRef.add({ ...data }).then(
      () => {
        this.spinner.hide()
        this.toastr.success("New Account Created")
        this.router.navigateByUrl('/login')
      },
      (err) => {
        this.spinner.hide()
        console.log("Error in Creating User Data", err);
        this.toastr.error("Something Went Wrong")
      }
    )
  }

  login(email: any, password: any) {

    this.auth.signInWithEmailAndPassword(email, password).then(
      (res: any) => {
        this.userRef.snapshotChanges()
          .pipe(
            map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
          ).subscribe(
            (userArray: any) => {
              let userData = userArray.filter((x: any) => { return x.uid == res.user.uid })[0]
              this.spinner.hide()
              this.authService.setData(userData)

              if (userData.userType == 1) {
                this.toastr.success("Welcome Admin")
                this.router.navigateByUrl('/admin/dashboard')
              }
              else if (userData.userType == 2) {
                if (userData.status == true) {
                  this.toastr.success("Welcome" + userData.name, "Success")
                  this.router.navigateByUrl('/customer/home')
                }
                else {
                  this.toastr.error("Account In-Active, Contact Admin")
                }
              }
              else {
                this.toastr.error("Wrong Credentials")
              }
            },
            (err) => {
              this.spinner.hide()
              this.toastr.error("Something Went Wrong")
              console.log("Error in Finding User Data", err);
            })
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error(err.message);
      }
    )
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
      this.authService.clear()
      this.toastr.success("Logout Successfully")
    })
  }

  getSingle(id: any) {
    return this.userRef.doc(id).valueChanges()
  }

  update(id: any, data: any) {
    return this.userRef.doc(id).update(data)
  }

  getAllCustomers(): AngularFirestoreCollection<User> {
    return this.db.collection(this.dbPath, (ref) => ref.where("userType", '==', 2))
  }
}

// import { Injectable } from '@angular/core';
// import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';
// import { User } from '../../model/user.model';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AuthService } from '../auth.service';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { map } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

// export class UserService {

//   dbPath: string = "/users"
//   userRef: AngularFirestoreCollection<User>

//   constructor(private db: AngularFirestore,
//     private auth: AngularFireAuth,
//     private authSpinner: AuthService,
//     private spinner: NgxSpinnerService,
//     private toastr: ToastrService,
//     private router: Router
//   ) {
//     this.userRef = db.collection(this.dbPath)
//   }

//   register(data: any) {
//     this.spinner.show()
//     this.auth.createUserWithEmailAndPassword(data.email!, data.password).then((res:any)=>{
//       this.spinner.hide()
//       delete data.password
//       data.uid = res.user.uid
//       data.createdAt = Date.now()
//       data.status = true
//       data.userType = 2
//       this.addUser(data)
//     })
//   }

//   addUser(data:any){
//     this.spinner.show()
//     this.userRef.add({...data}).then(
//       ()=>{
//         this.spinner.hide()
//         this.toastr.success('New Account Created')
//         this.router.navigateByUrl('/login')
//       },
//       (err)=>{
//         this.spinner.hide()
//         console.log("Error in creating Data", err);
//         this.toastr.error("Something Went Wrong.")
//       }
//     )
//   }
//   // setData(res: { token: string }) {
//   //   sessionStorage.setItem('token', res.token);
//   // }

//   // getToken() {
//   //   return sessionStorage.getItem('token');
//   // }

//   // async addUser(collectionName: string, data: any) {
//   //   const userCollection = collection(this.firestore, collectionName);
//   //   return await addDoc(userCollection, data);
//   // }

//   // async getUser(collectionName: string, email: string): Promise<User | null> {
//   //   const userCollection = collection(this.firestore, collectionName);
//   //   const q = query(userCollection, where('email', '==', email));
//   //   const userFound = await getDocs(q);

//   //   if (userFound.empty) {
//   //     return null;
//   //   } else {
//   //     const userDoc = userFound.docs[0];
//   //     return {
//   //       id: userDoc.id,
//   //       ...userDoc.data()
//   //     } as User;
//   //   }
//   // }

//   // async loginUser(collectionName: string, data: any) {
//   //   const loginCollection = collection(this.firestore, collectionName);
//   //   return await addDoc(loginCollection, data);
//   // }

//   // clear() {
//   //   sessionStorage.clear();
//   // }
// }
