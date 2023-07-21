import { autoinject, computedFrom } from "aurelia-framework";

@autoinject()
export class App
{
	currentTextIndex = 0;
	rotateText()
	{
		this.currentTextIndex = (this.currentTextIndex + 1) % this.textArr.length;
	}
	textArr = [
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fuga amet commodi beatae necessitatibus quibusdam sint dignissimos autem aliquid ratione! Amet architecto doloribus nisi, nihil voluptatem non sint impedit expedita et ducimus deleniti minus delectus fugit voluptate tenetur ratione dignissimos alias vero sapiente quod dicta rem ullam animi sequi. Aliquam iste nostrum laudantium quam iure itaque vitae voluptatibus repellat tempore eaque iusto deserunt necessitatibus quisquam dolore est asperiores veniam, corporis minus sit obcaecati. Quo soluta magnam, ducimus totam temporibus minima adipisci ratione nobis asperiores ab beatae nam repudiandae autem laudantium natus? Tenetur veniam deserunt doloremque placeat numquam consequatur magni temporibus!",
		"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam porro maiores fuga, totam in excepturi reiciendis molestias labore omnis commodi incidunt accusantium facere! Eos quidem ipsum, soluta earum recusandae hic ex esse corrupti perferendis pariatur, in quasi eum! Deserunt non nobis illo sit vitae suscipit. Atque molestiae cum tenetur doloribus corporis aliquid recusandae ad quisquam porro ea expedita officiis excepturi obcaecati ipsum, ex harum. Similique optio distinctio cupiditate itaque accusamus laborum quaerat, praesentium assumenda delectus? Laborum hic at obcaecati iure quasi eos unde ex aspernatur tempore officia fugit dolore eius porro dignissimos illo, molestiae doloribus, labore blanditiis? Incidunt, saepe inventore.",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex mollitia cumque ad sit, fugiat repellendus cum corrupti placeat et doloribus perferendis reiciendis, quidem quod consectetur quaerat culpa harum aliquam delectus ea ullam aspernatur! Repellendus vel obcaecati voluptatum est beatae, nemo quaerat nisi pariatur tempora autem, sapiente quo recusandae hic nam maxime nihil cumque numquam ducimus error necessitatibus totam non. Ad hic quibusdam cupiditate illum optio sunt ipsa doloribus excepturi cum soluta animi ea molestiae repellat, totam maiores. Quaerat aperiam quis vel accusantium, ratione voluptatibus ut reiciendis eius sequi incidunt quidem perferendis. Similique quia laboriosam, officiis illum accusantium aspernatur ullam consequatur!"
	];

	@computedFrom("textArr", "currentTextIndex")
	get currentText(): string
	{
		return this.textArr[this.currentTextIndex];
	}
}
