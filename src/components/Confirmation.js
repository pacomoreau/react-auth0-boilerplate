import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
} from "@chakra-ui/react"
import _ from "lodash"

export const Confirmation = ({
  onConfirm,
  onClose,
  isOpen = false,
  title = "Confirmation",
  body = "",
  yesLabel = "Yes",
  noLabel = "No",
}) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark"

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color={isDark ? "white" : "inherit"}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {body && <ModalBody>{body}</ModalBody>}

        <ModalFooter>
          {noLabel && _.isFunction(onClose) && (
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {noLabel}
            </Button>
          )}
          {yesLabel && _.isFunction(onConfirm) && (
            <Button variant="ghost" onClick={onConfirm}>
              {yesLabel}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
