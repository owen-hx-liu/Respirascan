import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // @Input() requiredFileType: string ;
  fileName = '';
  imageUrl: string | ArrayBuffer = undefined;

  link = '/';
  mainTitle = 'RespiraScan';
  subtitle = 'Lung Illness Classification';
  text1 = 'Address: Tuscarora High School - 5312 Ballenger Creek Pike, Frederick, MD 21703';
  text2 = 'SET-UP Friday, March 22, 2024 5:30PM - 7:30PM (You must check in project during this time to be eligible for judging on Saturday) (Gymnasium)';
  text3 = '9:00AM - 11:00AM - must be present entire time for the following categories: Animal Sciences, Biochemistry, Biomedical & Health Sciences, Computational Biology & Bioinformatics, Earth & Environmental Sciences, Energy: Sustainable Materials and Design, Environmental Engineering, Mathematics, Physics & Astronomy, Robotics & Intelligent Machines, Technology Advances the Arts';
  text4 = '10:00AM - 12:00PM - must be present entire time for the following categories: Behavioral & Social Sciences,    Biomedical Engineering, Cellular & Molecular Biology, Chemistry, Embedded Systems, Engineering Technology: Statics and Dynamics, Materials Science, Microbiology, Plant Sciences, Systems Software, Translational Medical Science';
  text5 = ': 3:00 - 4:00 PM';
  text6 = ': 4:00 PM (Auditorium)';
  text7 = ': 5:15 PM';
  text8 = 'LOTS of prizes and specialty awards for all grades, 6-12!';


  constructor(private meta: Meta,
    private title: Title,
    private http: HttpClient) {
    this.meta.addTags([
      {
        name: 'description',
        content:
          '2024 Frederick County Science Fair - Urbana Middle School',
      },
    ]);
    this.setTitle('2024 Frederick County Science Fair - Urbana Middle School');
  }

  ngOnInit() { }

  fileSelected(event: any) {
    this.fileName = '';
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      // this.submitImage(file);
      this.displayImage(file);
    }
  }

  displayImage(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }

  submitImage(file: any) {
    this.fileName = file.name;
    const formData = new FormData();
    formData.append("thumbnail", file);
    const upload$ = this.http.post("/api/thumbnail-upload", formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      // finalize(() => this.reset())
    );
  }

  public setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

}
