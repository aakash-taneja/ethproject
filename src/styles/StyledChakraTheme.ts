import { extendTheme } from "@chakra-ui/react";
import { style } from "./StyledConstants";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  styles: {
    global: (props: any) => ({
      html: {
        backgroundColor:
          props.colorMode == "light"
            ? "#f2f5fd"
            : `${style.color.bgMain} !important`,
      },
      body: {
        backgroundColor:
          props.colorMode == "light"
            ? "#f2f5fd"
            : `${style.color.bgMain} !important`,
      },
      "h1, h2, h3, h4, h5, h6": {
        // color: props.colorMode == "light" ? "#282828" : `${style.color.h}`,
        color: "#ffff",
      },
      "div, p, span": {
        // color: props.colorMode == "light" ? "#3d3d3d" :`${style.color.p}`,
        color: "#ffff",
      },
      "*::placeholder": {
        color: `${style.colorPlaceholder}`,
      },
      "::-webkit-scrollbar": {
        width: "10px",
      },
      "::-webkit-scrollbar-thumb": {
        background: props.colorMode == "light" ? "#c8c8c8" : "#0f172e",
        borderRadius: "20px",
        width: "8px",
        marginRight: "2px",
      },
      "::-webkit-scrollbar-track": {
        background:
          props.colorMode == "light" ? "#ededed" : "#00040d !important",
        // display: props.colorMode == "light" ? "none" : "block"
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: props.colorMode == "light" ? "#9fabc8" : "#172857",
      },
      ".no-scrollbar::-webkit-scrollbar": {
        display: "none",
      },
      "input:focus": {
        background: "#000",
      },
      ".chakra-modal__content-container": {
        display: "flex!important",
        flexDirection: "column!important",
        justifyContent: "center!important",
        borderRadius: "1.4rem!important",
      },
      ".chakra-modal__content": {
        // borderLeft: `${style.modal.border.default} !important`,
        // borderRadius: `${style.modal.borderRadius}!important`,
        // width: "50%!important",
      },
      ".chakra-modal__body": {
        // background: `${style.modal.bg.contractModal}`,
        paddingTop: "1rem !importannt",
      },
      ".chakra-modal__body::-webkit-scrollbar": {
        // background: `${style.modal.bg.contractModal}`,
        display: "none",
      },
      ".chakra-modal__header": {
        // background: `${style.modal.bg.contractModal}`,
        // borderBottom: `${style.modal.border.contract} !important`,
      },
      ".chakra-modal__footer": {
        // background: `${style.modal.bg.contractModal}`,
        // borderTop: `${style.modal.border.default} !important`,
      },
      ".chakra-modal__overlay": {
        opacity: "0.9 !important",
        // background: `${style.modal.bg.overlay} !important`,
        overflow: "hidden!important",
        borderRadius: "15px",
      },
      // ".chakra-modal__content": {
      //   background: `${style.modal.bg.contractModal}!important`,
      // },
      ".css-wl0d9u ": {
        // backgroundImage: `url("/assets/invitebg.png")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
      },
      ".alert": {
        background: `${style.bgPannelHeader}`,
      },
      ".chakra-input__left-element": {
        display: "flex",
        alignItems: "center",
        height: "100%!important",
      },
      ".chakra-input__right-element": {
        display: "flex",
        alignItems: "center",
        height: "100%!important",
      },
      ".css-1jec974 >option": {
        background: `${mode("#ffff", style.input.bg.default)} !important`,
      },
      ".css-2t0ktt": {
        borderRadius: `${style.input.borderRadius.default}!important`,
      },
      ".css-7p9xsp >option": {
        background: `${mode("#ffff", style.input.bg.default)} !important`,
      },

      ".css-1bki5fo::placeholder": {
        color: "#132041",
        paddingLeft: "5px",
      },
      ".css-12793pk >option": {
        background: `${mode("#ffff", `${style.input.bg.default}`)} !important`,
        border: "0px",
      },
      ".tw-connected-wallet__balance": {
        color: "#fff!important",
      },
      ".tw-connected-wallet__address": {
        color: "#fff!important",
      },
      ".css-10pwobq::-webkit-scrollbar ": {
        display: "none",
      },
    }),
  },
  textStyles: {},
  components: {
    Input: {
      baseStyle: {
        borderRadius: "10px",
      },
      variants: {
        normal: {
          field: {
            bg: `${style.input.bg.default}`,
            border: `${style.input.border.default}`,
            _hover: {
              border: `${style.input.border.active}`,
              bg: `${style.input.bg.active}`,
            },
            _focusVisible: {
              border: `${style.input.border.active}`,
              bg: `${style.input.bg.active}`,
              shadow: `${style.input.shadow.hover}`,
            },
          },
        },
        light: {
          field: {
            bg: "#ffff",
            color: "#3d3d3d !important",
            border: ``,
            _hover: {
              bg: "#fffff",
            },
            _focusVisible: {
              bg: "#ffff",
              // shadow: `${style.input.shadow.hover}`,
            },
          },
        },
      },
      defaultProps: {
        size: "md",
        variant: "normal",
      },
    },
    TextArea: {
      variants: {
        normal: {
          field: {
            bg: `${style.input.bg.default}`,
            border: `${style.input.border.default}`,
            _hover: {
              border: `${style.input.border.active}`,
              bg: `${style.input.bg.active}`,
            },
            _focusVisible: {
              border: `${style.input.border.active}`,
              bg: `${style.input.bg.active}`,
              shadow: `${style.input.shadow.hover}`,
            },
          },
        },
        light: {
          field: {
            bg: "#ffff",
            color: "#3d3d3d !important",
            border: ``,
            _hover: {
              bg: "#fffff",
            },
            _focusVisible: {
              bg: "#ffff",
              shadow: `${style.input.shadow.hover}`,
            },
          },
        },
      },
      baseStyle: {
        field: {
          borderRadius: "10px",
        },
      },
      defaultProps: {
        size: "md",
        variant: "normal",
      },
    },
    Button: {
      baseStyle: {
        background: `${style.button.bg.default}`,
      },
      variants: {
        transparent: {
          background: "transparent",
          opacity: "0.5",
          _hover: {
            background: `${style.button.bg.default}`,
            opacity: "1",
          },
        },
        state_default_hover: {
          background: `${style.card.bg.default}`,
          border: `${style.card.border.default}`,
          shadow: `${style.card.shadow.default}`,
          _hover: {
            background: `${style.card.bg.hover}`,
            border: `${style.card.border.hover}`,
            shadow: `${style.card.shadow.hover}`,
          },
        },
        state_default_hover_light: {
          color: "#3d3d3d",
          background: `${style.card.bg.default}`,
          border: `1px solid #e2e2e2`,
          shadow: `${style.card.shadow.default}`,
          // _hover: {
          //   background: `${style.card.bg.hover}`,
          //   border: `${style.card.border.hover}`,
          //   shadow: `${style.card.shadow.hover}`,
          // },
        },
        state_transparent_hover: {
          background: "transparent !important",
          border: `${style.card.border.transparent}!important`,
          _hover: {
            border: `${style.card.border.default}!important`,
          },
        },
        state_transparent_to_brand_hover: {
          background: "transparent",
          border: `1px solid transparent`,
          cursor: "pointer",
          _hover: {
            background: `${style.button.bg.activeTranslucent}`,
            border: `1px solid ${style.brButton.active}`,
            color: "#FFF",
          },
        },
        state_empty_brand_to_solid_brand: {
          background: "transparent",
          border: `${style.button.border.active}`,
          color: `${style.button.color.active}`,
          cursor: "pointer",
          _hover: {
            background: `${style.button.bg.active}`,
            border: `${style.button.border.active}`,
            color: "#FFF",
          },
        },

        state_default_to_brand: {
          background: `${style.button.bg.default}`,
          _hover: {
            background: `${style.button.bg.active}`,
            color: "#FF",
          },
        },

        state_default_warning: {
          background: `${style.button.bg.warning}`,
          border: "1px solid #ffffff",
        },

        state_brand: {
          background: `${style.button.bg.active}`,
          color: "#ffff",
          // padding: "0.5rem",
        },
        state_light: {
          background: `rgba(255,255,255,1)`,
          color: "#3d3d3d",
          border: "1px solid #e2e2e2",
        },
        state_brand_hover: {
          background: `${style.button.bg.activeTranslucent}`,
          border: `1px solid ${style.brButton.active}`,
          color: "#FFF",
        },
        state_card: {
          background: `${style.card.bg.default}`,
          border: `${style.card.border.default}`,
          shadow: `${style.card.shadow.default}`,
        },
        state_card_hover: {
          background: `${style.card.bg.default}`,
          border: `${style.card.border.default}`,
          shadow: `${style.card.shadow.default}`,
          _hover: {
            background: `${style.card.bg.hover}`,
            border: `1px solid ${style.card.border.hover}`,
            shadow: `${style.card.shadow.hover}`,
          },
        },
        state_list: {
          background: `${style.card.bg.default}`,
          borderRadius: "5px",
          borderBottom: `${style.card.border.default}`,
          shadow: `${style.card.shadow.default}`,
        },
        state_list_hover: {
          background: `${style.card.bg.default}`,
          borderBottom: `${style.card.border.default}`,
          shadow: `${style.card.shadow.default}`,
          borderRadius: "10px",
          _hover: {
            background: `${style.card.bg.hover}`,
            borderBottom: `10px solid ${style.card.border.hover}`,
            shadow: `${style.card.shadow.hover}`,
          },
        },
        state_list_active: {
          background: `${style.button.bg.active}`,
          color: "#FF",
          borderRadius: "10px",
          borderBottom: `${style.card.border.default}`,
          shadow: `${style.card.shadow.default}`,
        },
        state_lens: {
          opacity: "0.95",
          background: "#ABFD2C",
          color: "#1A202C",
          _hover: {
            opacity: "1",
          },
        },
        state_lens_unfollow: {
          opacity: "0.95",
          background: "#C22D3F",
          color: "#FFFFFF",
          _hover: {
            opacity: "1",
          },
        },
        state_xmtp: {
          opacity: "0.95",
          background: `linear-gradient(91.55deg, #FC4F37 -5.05%, #31006E 105.58%)`,
          color: "#fff",
          _hover: {
            opacity: "1",
          },
        },
      },
      defaultProps: {
        colorScheme: "whiteAlpha",
      },
    },
    Tag: {
      baseStyle: {
        background: `${style.button.bg.default}`,
        cursor: "pointer",
      },
      defaultProps: {
        colorScheme: "whiteAlpha",
      },
      variants: {
        state_brand: {
          background: `${style.button.bg.active}`,
          color: "#ffff",
        },
        state_xmtp: {
          opacity: "0.95",
          background: `linear-gradient(91.55deg, #FC4F37 -5.05%, #31006E 105.58%)`,
          color: "#fff",
          _hover: {
            opacity: "1",
          },
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: `${style.dropdown.bg.default}`,
          border: `${style.dropdown.border}`,
          minW: "5xs",
          zIndex: 1000,
        },
        item: {
          bg: `${style.button.bg.default}`,
          _hover: {
            bg: `${style.button.bg.hover}`,
          },
          _focus: {
            bg: `${style.button.bg.default}`,
          },
        },
      },
      lightStyle: {
        list: {
          bg: `rgba(255,255,255,1)`,
          border: `${style.dropdown.border}`,
          minW: "5xs",
          zIndex: 1000,
        },
        item: {
          bg: `${style.button.bg.default}`,
          _hover: {
            bg: `${style.button.bg.hover}`,
          },
          _focus: {
            bg: `${style.button.bg.default}`,
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        overlay: {
          background: `${style.modal.bg.default}`,
          opacity: "1",
        },
        dialogContainer: {
          alignItems: "center",
        },
      },
      sizes: {},
    },
    Toast: {
      defaultProps: {
        colorScheme: "whiteAlpha",
      },
    },
    Popover: {
      baseStyle: {
        content: {
          width: "3xs",
          bg: `${style.popover.bg.default}`,
          border: "1px solid",
          borderColor: "gray.800",
        },
      },
    },
  },
});

export default theme;
