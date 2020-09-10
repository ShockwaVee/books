import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";
import { TextContentProps } from "./interfaces/TextContentProps";
import { FontSize } from "../../../enums/FontSize";
import * as React from "react";
import { FunctionComponent } from "react";

const AntdText = Typography.Text;

export const TextContent: FunctionComponent<
  TextContentProps & TextProps
> = React.forwardRef((props, ref) => {
  const fontSizeValue = props.fontSize || FontSize.Regular14;
  const { fontSize, children, ...textProps } = props;
  return (
    <AntdText style={{ fontSize: fontSizeValue }} {...textProps}>
      {children}
    </AntdText>
  );
});
