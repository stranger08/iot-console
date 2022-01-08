import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GroupsService } from '../../services/groups.service';

@Component({
    templateUrl: 'group.component.html',
})
export class GroupComponent {

  constructor(
    private groupsService: GroupsService,
    private route: ActivatedRoute,
  ) {

  }

  private group:any = {};

  ngOnInit() {
    this.route.params.subscribe(params => {
      const ID = params['id'];

      this.groupsService.findOne(ID).subscribe(resp => {
        this.group = resp;

        this.route.data.subscribe(data => {
          data.title = resp['name'];
        });
      });
    });
  }

}
