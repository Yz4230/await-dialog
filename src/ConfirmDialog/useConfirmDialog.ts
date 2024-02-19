import {
  ComponentPropsWithoutRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import ConfirmDialog from "./ConfirmDialog";

type ConfirmDialogProps = ComponentPropsWithoutRef<typeof ConfirmDialog>;
type Options = Pick<
  ConfirmDialogProps,
  "title" | "confirmLabel" | "cancelLabel"
>;

type Resolver<T> = (value: T) => void;

type Return = {
  action: "proceed" | "cancel";
};

export default function useConfirmDialog() {
  const resolver = useRef<Resolver<Return>>();
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Options>({});

  const open = useCallback((opts: Options = {}) => {
    setIsOpen(true);
    setOptions(opts);
    return new Promise<Return>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const props = useMemo<ConfirmDialogProps>(() => {
    function onConfirm() {
      setIsOpen(false);
      resolver.current?.({ action: "proceed" });
      resolver.current = undefined;
    }

    function onCancel() {
      setIsOpen(false);
      resolver.current?.({ action: "cancel" });
      resolver.current = undefined;
    }

    return {
      isOpen,
      onConfirm,
      onCancel,
      onClose: onCancel,
      ...options,
    };
  }, [isOpen, options]);

  return { open, props };
}
