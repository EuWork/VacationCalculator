import TextRenderer from "../../../Renderers/text";
import TagRenderer from "../../../Renderers/tag";
import TwoDatesRenderer from "../../../Renderers/twoDates";
import dateRenderer from "../../../Renderers/date";
import fakeLinkRenderer from "../../../Renderers/fakeLink";
import arrowRenderer from "../../../Renderers/arrow";

export const renderers = {
  text: TextRenderer,
  tag: TagRenderer,
  twoDates: TwoDatesRenderer,
  date: dateRenderer,
  fakeLink: fakeLinkRenderer,
  arrow: arrowRenderer,
  empty: () => null,
};
