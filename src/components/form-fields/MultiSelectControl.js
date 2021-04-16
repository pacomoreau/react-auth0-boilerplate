import { useField } from "react-final-form"
import { Control, Error } from "./index"
import {
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  Divider,
  CloseButton,
  Center,
  Box,
  Portal,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  useTheme,
  useColorMode,
  useColorModeValue,
  FormLabel,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import Select, { components as selectComponents } from "react-select"

// cf. https://codesandbox.io/s/chakra-ui-react-select-forked-evzht?file=/multi-select.js

const chakraStyles = {
  input: (provided) => ({
    ...provided,
    color: "inherit",
    lineHeight: 1,
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "none",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0.125rem 1rem",
  }),
  control: () => {},
  menuList: () => {},
  option: () => {},
  multiValue: () => {},
  multiValueLabel: () => {},
  multiValueRemove: () => {},
  group: () => {},
}

const chakraComponents = {
  // Control components
  Control: ({
    children,
    innerRef,
    innerProps,
    isDisabled,
    isFocused,
    selectProps: { isInvalid },
  }) => {
    const inputStyles = useMultiStyleConfig("Input")
    const chakraTheme = useTheme()
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"
    let invalidStyles
    if (isInvalid) {
      const invalidColor = isDark ? chakraTheme.colors.red[300] : chakraTheme.colors.red[500]
      invalidStyles = {
        color: invalidColor,
        borderColor: invalidColor,
        boxShadow: `0 0 0 1px ${invalidColor}`,
      }
    }
    console.log(chakraTheme.colors.red[500])
    return (
      <StylesProvider value={inputStyles}>
        <Flex
          ref={innerRef}
          sx={{
            ...inputStyles.field,
            p: 0,
            overflow: "hidden",
            h: "auto",
            minH: 10,
          }}
          {...innerProps}
          {...(isFocused && { "data-focus": true })}
          {...(isDisabled && { disabled: true })}
          {...invalidStyles}
        >
          {children}
        </Flex>
      </StylesProvider>
    )
  },
  MultiValueContainer: ({ children, innerRef, innerProps, data: { isFixed } }) => (
    <Tag ref={innerRef} {...innerProps} m="0.125rem" variant={isFixed ? "solid" : "subtle"}>
      {children}
    </Tag>
  ),
  MultiValueLabel: ({ children, innerRef, innerProps }) => (
    <TagLabel ref={innerRef} {...innerProps}>
      {children}
    </TagLabel>
  ),
  MultiValueRemove: ({ children, innerRef, innerProps, data: { isFixed } }) => {
    if (isFixed) {
      return null
    }

    return (
      <TagCloseButton ref={innerRef} {...innerProps}>
        {children}
      </TagCloseButton>
    )
  },
  IndicatorSeparator: ({ innerRef, innerProps }) => (
    <Divider ref={innerRef} {...innerProps} orientation="vertical" opacity="1" />
  ),
  ClearIndicator: ({ innerRef, innerProps }) => (
    <CloseButton ref={innerRef} {...innerProps} size="sm" mx={2} />
  ),
  DropdownIndicator: ({ innerRef, innerProps }) => {
    const { addon } = useStyles()

    return (
      <Center
        ref={innerRef}
        {...innerProps}
        sx={{
          ...addon,
          h: "100%",
          borderRadius: 0,
          borderWidth: 0,
          cursor: "pointer",
        }}
      >
        <ChevronDownIcon h={5} w={5} />
      </Center>
    )
  },
  // Menu components
  MenuPortal: ({ innerRef, innerProps, children }) => (
    <Portal ref={innerRef} {...innerProps}>
      {children}
    </Portal>
  ),
  Menu: ({ children, ...props }) => {
    const menuStyles = useMultiStyleConfig("Menu")
    return (
      <selectComponents.Menu {...props}>
        <StylesProvider value={menuStyles}>{children}</StylesProvider>
      </selectComponents.Menu>
    )
  },
  MenuList: ({ innerRef, innerProps, children, maxHeight }) => {
    const { list } = useStyles()
    return (
      <Box
        sx={{
          ...list,
          maxH: `${maxHeight}px`,
          overflowY: "auto",
        }}
        ref={innerRef}
        {...innerProps}
      >
        {children}
      </Box>
    )
  },
  GroupHeading: ({ innerProps, children }) => {
    const { groupTitle } = useStyles()
    return (
      <Box sx={groupTitle} {...innerProps}>
        {children}
      </Box>
    )
  },
  Option: ({ innerRef, innerProps, children, isFocused, isDisabled }) => {
    const { item } = useStyles()
    return (
      <Box
        as="button"
        sx={{
          ...item,
          w: "100%",
          textAlign: "left",
          bg: isFocused ? item._focus.bg : "transparent",
          ...(isDisabled && item._disabled),
        }}
        ref={innerRef}
        {...innerProps}
        {...(isDisabled && { disabled: true })}
      >
        {children}
      </Box>
    )
  },
}

const MultiSelect = ({ name = "", styles = {}, components = {}, theme = {}, ...props }) => {
  const chakraTheme = useTheme()

  const placeholderColor = useColorModeValue(
    chakraTheme.colors.gray[400],
    chakraTheme.colors.whiteAlpha[400]
  )

  return (
    <Select
      name={name}
      components={{
        ...chakraComponents,
        ...components,
      }}
      styles={{
        ...chakraStyles,
        ...styles,
      }}
      theme={(baseTheme) => ({
        ...baseTheme,
        borderRadius: chakraTheme.radii.md,
        colors: {
          ...baseTheme.colors,
          neutral50: placeholderColor, // placeholder text color
          neutral40: placeholderColor, // noOptionsMessage color
          ...theme.colors,
        },
        spacing: {
          ...baseTheme.spacing,
          ...theme.spacing,
        },
      })}
      {...props}
    />
  )
}

export const MultiSelectControl = ({
  name,
  label,
  options = [],
  isMulti = true,
  valueKey = "value",
  labelKey = "label",
}) => {
  const { input, meta } = useField(name)
  return (
    <Control name={name} my={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <MultiSelect
        {...input}
        isInvalid={meta.error && meta.touched}
        id={name}
        placeholder={label}
        isMulti={isMulti}
        options={options}
        getOptionLabel={(item) => item[labelKey]}
        getOptionValue={(item) => item[valueKey]}
      />
      <Error name={name} />
    </Control>
  )
}
