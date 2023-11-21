import { style } from "@/styles/StyledConstants";

type Props = {
  header?: any;
  width?: any;
  children?: any;
  footer?: any;
  onClick?: any;
  margin?: any;
};

const CardPannel = ({
  header,
  children,
  footer,
  onClick,
  margin,
  width,
}: Props) => {
  return (
    <div
      style={{
        // borderRadius: ` ${style.card.borderRadius}`,
        border: `${style.input.border.default}`,
        borderRadius: `${style.card.borderRadius.default}`,
        boxShadow: ` ${style.card.shadow.default} `,
        cursor: "pointer",
        width: width ? `${width}` : "100%",
        margin: margin ? style?.margin[margin] : "0rem",
      }}
    >
      <div
        style={{
          background: ` ${style.card.bg.overview}`,
          // borderTopRadius: `${style.card.borderRadius.default}`,
          borderTopLeftRadius: `${style.card.borderRadius.default}`,
          borderTopRightRadius: `${style.card.borderRadius.default}`,
          borderBottom: `${style.card.border.default}`,
          padding: `${style.card.padding.default}`,
        }}
      >
        {header}
      </div>
      <div style={{ padding: "1rem" }}>{children}</div>
      {footer && (
        <div
          style={{
            borderTop: `${style.card.border.default}`,
            padding: `${style.card.padding.default}`,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default CardPannel;
