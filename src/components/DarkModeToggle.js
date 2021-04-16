import { useColorMode, Switch } from "@chakra-ui/react"

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"

  return <Switch isChecked={isDark} onChange={toggleColorMode} data-testid="dark-mode-toggle" />
}
