import categories from "../../db/categories.json";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { AspectControllerType } from "../buildingBlocks/Aspect/AspectController";
import _ from "lodash";
import svgProvider from "../../assets/svgProvider";
import TableOfContents from "../buildingBlocks/TableOfContents";

function Catalog() {
  const aspectGroups: AspectGroupType[] = categories;
  const aspects: AspectControllerType[] = [];
  aspectGroups.map((aspectGroup) => {
    aspects.push(...aspectGroup.poses);
  });
  const sortedUniqueAspects = _.sortBy(_.uniqBy(aspects, "id"), "english_name");

  return (
    <>
      <div className="flex h-fit flex-col gap-10">
        {sortedUniqueAspects.map((aspect) => {
          const image = svgProvider(aspect.url_svg_alt_local);

          {
            return (
              <>
                <div className="hidden max-w-[700px] min-[570px]:flex">
                  <div className="flex w-[200px] items-center justify-center pl-4 pr-10">
                    <img src={image} alt="" />
                  </div>
                  <div className="w-full">
                    <h2
                      className="pl-[5px] text-start text-[30px]"
                      id={aspect.url_svg_alt_local}
                    >
                      {aspect.english_name} | {aspect.sanskrit_name}{" "}
                    </h2>
                    <p className="pl-[5px] text-start">
                      {aspect.translation_name}
                    </p>
                    <br />
                    <div className="flex h-full w-full flex-col ">
                      <div className="flex w-full gap-2">
                        <p className="min-w-[80px] text-end text-[#a0a0a0]">
                          Instruction
                        </p>
                        <div className="h-full w-[1px] bg-[#323232]"></div>
                        <p className="w-full pb-4 text-start text-[#a0a0a0]">
                          {aspect.pose_description}
                        </p>
                      </div>
                      <div className="flex w-full gap-2">
                        <p className="min-w-[80px] text-end text-[#a0a0a0]">
                          Benefits
                        </p>
                        <div className="h-full w-[1px] bg-[#323232]"></div>

                        <p className="w-full pb-4 text-start text-[#a0a0a0]">
                          {aspect.pose_benefits}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex max-w-[700px] min-[570px]:hidden">
                  <div className="w-full">
                    <div className="pl-[5px] text-start text-[30px]">
                      {aspect.english_name} | {aspect.sanskrit_name}{" "}
                    </div>
                    <p className="pl-[5px] text-start">
                      {aspect.translation_name}
                    </p>
                    <div className="flex w-[200px] items-center justify-center pb-4 pt-4">
                      <img src={image} alt="" />
                    </div>
                    <div className="flex h-full w-full flex-col ">
                      <div className="flex w-full gap-2">
                        <p className="min-w-[80px] text-end text-[#a0a0a0]">
                          Instruction
                        </p>
                        <div className="h-full w-[1px] bg-[#323232]"></div>
                        <p className="w-full pb-4 text-start text-[#a0a0a0]">
                          {aspect.pose_description}
                        </p>
                      </div>
                      <div className="flex w-full gap-2">
                        <p className="min-w-[80px] text-end text-[#a0a0a0]">
                          Benefits
                        </p>
                        <div className="h-full w-[1px] bg-[#323232]"></div>

                        <p className="w-full pb-4 text-start text-[#a0a0a0]">
                          {aspect.pose_benefits}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] min-h-[1px] w-auto bg-[#323232]"></div>
              </>
            );
          }
        })}
      </div>
      <TableOfContents />
    </>
  );
}

export default Catalog;
