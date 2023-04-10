import { View, ViewEngineHooks } from "aurelia-framework";
import { AgeFilterEnum } from "./age-filter-enum";

export class EnumViewEngineHooks implements ViewEngineHooks
{
	beforeBind(view: View): void
	{
		view.overrideContext["AgeFilterEnum"] = AgeFilterEnum;
	}
}
