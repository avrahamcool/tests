import { deepComputedFrom } from "aurelia-deep-computed";
import { Worker, Activity } from "./models";

export class App
{
  activities: Activity[] = [
    {
      activityName: "רופא בכיר",
      workers: [
        {
          id: 1,
          name: "one"
        },
        {
          id: 2,
          name: "two"
        }
      ],
      selected: null
    },
    {
      activityName: "עוזר",
      workers: [
        {
          id: 2,
          name: "two"
        },
        {
          id: 3,
          name: "three"
        }
      ],
      selected: null
    },
    {
      activityName: "אחות א",
      workers: [
        {
          id: 4,
          name: "four"
        },
        {
          id: 5,
          name: "five"
        },
        {
          id: 6,
          name: "six"
        }
      ],
      selected: null
    },
    {
      activityName: "אחות ב",
      workers: [
        {
          id: 4,
          name: "four"
        },
        {
          id: 5,
          name: "five"
        },
        {
          id: 6,
          name: "six"
        }
      ],
      selected: null
    },
  ];

  @deepComputedFrom("activities")
  get selected(): Worker[]
  {
    return this.activities?.map(activity => activity.selected);
  }

  isSelected(worker: Worker, selected: Worker[]): boolean
  {
    return selected?.some(item => item?.id === worker?.id);
  }
}
