import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Match } from './models/match';
import { TournamentService } from './services/tournament.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit {
  // Reference to the html form
  @ViewChild('matchesForm') matchesForm: NgForm;

  totalMatches: Match[] = [];
  match: Match;
  idLastMatch: number = 0; 

  constructor(private tournamentService: TournamentService, private datePipe: DatePipe) {
    // Initialize at the beginning an empty match data with the mandatory fields
    this.match = {
      time: {
        time: "",
        date: ""
      },
      result: {
        home: 0,
        away: 0
      },
      teams: {
        home: {
          name: ""
        },
        away: {
          name: "",
        }
      }
    };
  }

  ngOnInit(): void {
    // Here we fetch the data from the json-server. Json-server is a node module that you can use to create demo rest json webservice
    // Inside the db.json you can find the data that I copied from the https://www.dontouch.ch/json/cc.json 
    // I took the matches data since it's the only one I had to use.
    this.retrieveMatches();
  }

  private retrieveMatches() {
    this.tournamentService.getTournamentData().subscribe({
      next:(res) => {
        // Retrieve id of last match if response is not empty otherwise set it to 0
        if (res.length !== 0) {
          this.idLastMatch = res.slice(-1)[0].id;
        } else {
          this.idLastMatch = 0;
        }
        // Save the total matches data in an array, this makes sure that later we can push a new match to this array when user 
        // creates a new match -> this way we don't need to call the get api call after every post (and delete) api call 
        // but only inside ngOnInit.
        this.totalMatches = res;
      },
      error:() => {
        alert("Error retrieving matches data");
      }
    });
  }

  onMatchCreate(match: any) {
    // Create a new entry only if the form is valid, I could have used more validation logic but you get the idea.
    // I did validation for empty fields and for requiring type "numbers" in the last 2 input fields, also added date and time picker
    if (this.matchesForm.valid) {
      // Create a new id for the new match - (using uuid library was better I think but I preferred to use this approach to make 
      // the id structure similar to the previous ones from the api)
      this.match.id = this.idLastMatch + 2;
      this.idLastMatch = this.match.id;
      // Populate the new match with the data from the form
      this.match.teams.home.name = match.team1;
      this.match.teams.away.name = match.team2;
      // Transform the date format in the same one from the api response using angular datePipe
      this.match.time.date = this.datePipe.transform(match.date, 'dd/MM/yy');
      this.match.time.time = match.time;
      this.match.result.home = match.goalsteam1;
      this.match.result.away = match.goalsteam2;
      // Add the new match data to the array of matches
      this.totalMatches.push(this.match);
      this.tournamentService.postTournamentData(this.match).subscribe({
        next:() => {
          alert("A match entry has been added.");
        },
        error:() => {
          alert("Error while adding a match");
        },
        complete:() => {
          // Reset match data object
          this.match = {
            time: {
              time: "",
              date: ""
            },
            result: {
              home: 0,
              away: 0
            },
            teams: {
              home: {
                name: ""
              },
              away: {
                name: "",
              }
            }
          };
        }
      });
    } else {
      alert("Please add a valid match entry.");
    }
  }

  onMatchDelete(id: number) {
    this.tournamentService.deleteTournamentData(id).subscribe({
      next:() => {
        alert("A match entry has been deleted.");
      },
      error:() => {
        alert("Error while deleting a match");
      },
      complete:() => {
        // Instead of doing a get api call through this.retrieveMatches() we delete the entry from the saved array totalMatches
        this.totalMatches = this.totalMatches.filter(item => item.id !== id);
        if (this.totalMatches.length !== 0) {
          this.idLastMatch = this.totalMatches.slice(-1)[0].id;
        } else {
          this.idLastMatch = 0;
        }
      }
    });
  }
}