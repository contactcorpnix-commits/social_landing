"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import {
  FileArchiveIcon,
  FileAudioIcon,
  FileCodeIcon,
  FileCogIcon,
  FileIcon,
  FileTextIcon,
  FileVideoIcon,
} from "lucide-react";
import * as React from "react";

const ROOT_NAME = "FileUpload";
const DROPZONE_NAME = "FileUploadDropzone";
const TRIGGER_NAME = "FileUploadTrigger";
const LIST_NAME = "FileUploadList";
const ITEM_NAME = "FileUploadItem";
const ITEM_PREVIEW_NAME = "FileUploadItemPreview";
const ITEM_METADATA_NAME = "FileUploadItemMetadata";
const ITEM_PROGRESS_NAME = "FileUploadItemProgress";
const ITEM_DELETE_NAME = "FileUploadItemDelete";
const CLEAR_NAME = "FileUploadClear";

const FILE_UPLOAD_ERRORS = {
  [ROOT_NAME]: `\`${ROOT_NAME}\` must be used as root component`,
  [DROPZONE_NAME]: `\`${DROPZONE_NAME}\` must be within \`${ROOT_NAME}\``,
  [TRIGGER_NAME]: `\`${TRIGGER_NAME}\` must be within \`${ROOT_NAME}\``,
  [LIST_NAME]: `\`${LIST_NAME}\` must be within \`${ROOT_NAME}\``,
  [ITEM_NAME]: `\`${ITEM_NAME}\` must be within \`${ROOT_NAME}\``,
  [ITEM_PREVIEW_NAME]: `\`${ITEM_PREVIEW_NAME}\` must be within \`${ITEM_NAME}\``,
  [ITEM_METADATA_NAME]: `\`${ITEM_METADATA_NAME}\` must be within \`${ITEM_NAME}\``,
  [ITEM_PROGRESS_NAME]: `\`${ITEM_PROGRESS_NAME}\` must be within \`${ITEM_NAME}\``,
  [ITEM_DELETE_NAME]: `\`${ITEM_DELETE_NAME}\` must be within \`${ITEM_NAME}\``,
  [CLEAR_NAME]: `\`${CLEAR_NAME}\` must be within \`${ROOT_NAME}\``,
};

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

function useAsRef(data) {
  const ref = React.useRef(data);
  useIsomorphicLayoutEffect(() => {
    ref.current = data;
  });
  return ref;
}

function useLazyRef(fn) {
  const ref = React.useRef(null);
  if (ref.current === null) {
    ref.current = fn();
  }
  return ref;
}

const DirectionContext = React.createContext(undefined);
const FileUploadContext = React.createContext(null);

function useDirection(dirProp) {
  const contextDir = React.useContext(DirectionContext);
  return dirProp ?? contextDir ?? "ltr";
}

function createStore(listeners, files, onValueChange, invalid) {
  const initialState = {
    files,
    dragOver: false,
    invalid: invalid ?? false,
  };

  let state = initialState;

  function reducer(state, action) {
    switch (action.variant) {
      case "ADD_FILES": {
        for (const file of action.files) {
          files.set(file, {
            file,
            progress: 0,
            status: "idle",
          });
        }

        if (onValueChange) {
          const fileList = Array.from(files.values()).map(
            (fileState) => fileState.file
          );
          onValueChange(fileList);
        }
        return { ...state, files };
      }

      case "SET_FILES": {
        const newFileSet = new Set(action.files);
        for (const existingFile of files.keys()) {
          if (!newFileSet.has(existingFile)) {
            files.delete(existingFile);
          }
        }

        for (const file of action.files) {
          const existingState = files.get(file);
          if (!existingState) {
            files.set(file, {
              file,
              progress: 0,
              status: "idle",
            });
          }
        }
        return { ...state, files };
      }

      case "SET_PROGRESS": {
        const fileState = files.get(action.file);
        if (fileState) {
          files.set(action.file, {
            ...fileState,
            progress: action.progress,
            status: "uploading",
          });
        }
        return { ...state, files };
      }

      case "SET_SUCCESS": {
        const fileState = files.get(action.file);
        if (fileState) {
          files.set(action.file, {
            ...fileState,
            progress: 100,
            status: "success",
          });
        }
        return { ...state, files };
      }

      case "SET_ERROR": {
        const fileState = files.get(action.file);
        if (fileState) {
          files.set(action.file, {
            ...fileState,
            error: action.error,
            status: "error",
          });
        }
        return { ...state, files };
      }

      case "REMOVE_FILE": {
        files.delete(action.file);

        if (onValueChange) {
          const fileList = Array.from(files.values()).map(
            (fileState) => fileState.file
          );
          onValueChange(fileList);
        }
        return { ...state, files };
      }

      case "SET_DRAG_OVER": {
        return { ...state, dragOver: action.dragOver };
      }

      case "SET_INVALID": {
        return { ...state, invalid: action.invalid };
      }

      case "CLEAR": {
        files.clear();
        if (onValueChange) {
          onValueChange([]);
        }
        return { ...state, files, invalid: false };
      }

      default:
        return state;
    }
  }

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (const listener of listeners) {
      listener();
    }
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { getState, dispatch, subscribe };
}

const StoreContext = React.createContext(null);
StoreContext.displayName = ROOT_NAME;

function useStoreContext(name) {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error(FILE_UPLOAD_ERRORS[name]);
  }
  return context;
}

function useFileUploadContext(name) {
  const context = React.useContext(FileUploadContext);
  if (!context) {
    throw new Error(FILE_UPLOAD_ERRORS[name]);
  }
  return context;
}

function useStore(selector) {
  const store = useStoreContext(ROOT_NAME);

  const lastValueRef = useLazyRef(() => null);

  const getSnapshot = React.useCallback(() => {
    const state = store.getState();
    const prevValue = lastValueRef.current;

    if (prevValue && prevValue.state === state) {
      return prevValue.value;
    }

    const nextValue = selector(state);
    lastValueRef.current = { value: nextValue, state };
    return nextValue;
  }, [store, selector, lastValueRef]);

  const subscribe = React.useCallback(
    (listener) => store.subscribe(listener),
    [store]
  );

  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export const FileUploadRoot = React.forwardRef(function FileUploadRoot({
  value,
  defaultValue,
  onValueChange,
  onAccept,
  onFileAccept,
  onFileReject,
  onFileValidate,
  onUpload,
  accept,
  maxFiles,
  maxSize,
  dir: dirProp,
  label,
  name,
  asChild,
  disabled = false,
  invalid = false,
  multiple = false,
  required = false,
  children,
  className,
  ...rootProps
}, forwardedRef) {
  const inputId = React.useId();
  const dropzoneId = React.useId();
  const listId = React.useId();
  const labelId = React.useId();

  const dir = useDirection(dirProp);
  const propsRef = useAsRef({
    disabled,
    maxFiles,
    maxSize,
    accept,
    onValueChange,
    onAccept,
    onFileAccept,
    onFileReject,
    onFileValidate,
    onUpload,
  });
  const listeners = useLazyRef(() => new Set()).current;
  const files = useLazyRef(() => new Map()).current;
  const inputRef = React.useRef(null);
  const isControlled = value !== undefined;

  const store = React.useMemo(
    () => createStore(listeners, files, onValueChange, invalid),
    [listeners, files, onValueChange, invalid]
  );

  const contextValue = React.useMemo(
    () => ({
      dropzoneId,
      inputId,
      listId,
      labelId,
      dir,
      disabled,
      inputRef,
    }),
    [dropzoneId, inputId, listId, labelId, dir, disabled]
  );

  React.useEffect(() => {
    if (isControlled) {
      store.dispatch({ variant: "SET_FILES", files: value });
    } else if (
      defaultValue &&
      defaultValue.length > 0 &&
      !store.getState().files.size
    ) {
      store.dispatch({ variant: "SET_FILES", files: defaultValue });
    }
  }, [value, defaultValue, isControlled, store]);

  const onFilesChange = React.useCallback(
    (originalFiles) => {
      if (propsRef.current.disabled) return;

      let filesToProcess = [...originalFiles];
      let invalid = false;

      if (propsRef.current.maxFiles) {
        const currentCount = store.getState().files.size;
        const remainingSlotCount = Math.max(
          0,
          propsRef.current.maxFiles - currentCount
        );

        if (remainingSlotCount < filesToProcess.length) {
          const rejectedFiles = filesToProcess.slice(remainingSlotCount);
          invalid = true;

          filesToProcess = filesToProcess.slice(0, remainingSlotCount);

          for (const file of rejectedFiles) {
            let rejectionMessage = `Maximum ${propsRef.current.maxFiles} files allowed`;

            if (propsRef.current.onFileValidate) {
              const validationMessage = propsRef.current.onFileValidate(file);
              if (validationMessage) {
                rejectionMessage = validationMessage;
              }
            }

            propsRef.current.onFileReject?.(file, rejectionMessage);
          }
        }
      }

      const acceptedFiles = [];
      const rejectedFiles = [];

      for (const file of filesToProcess) {
        let rejected = false;
        let rejectionMessage = "";

        if (propsRef.current.onFileValidate) {
          const validationMessage = propsRef.current.onFileValidate(file);
          if (validationMessage) {
            rejectionMessage = validationMessage;
            propsRef.current.onFileReject?.(file, rejectionMessage);
            rejected = true;
            invalid = true;
            continue;
          }
        }

        if (propsRef.current.accept) {
          const acceptTypes = propsRef.current.accept
            .split(",")
            .map((t) => t.trim());
          const fileType = file.type;
          const fileExtension = `.${file.name.split(".").pop()}`;

          if (
            !acceptTypes.some(
              (type) =>
                type === fileType ||
                type === fileExtension ||
                (type.includes("/*") &&
                  fileType.startsWith(type.replace("/*", "/")))
            )
          ) {
            rejectionMessage = "File type not accepted";
            propsRef.current.onFileReject?.(file, rejectionMessage);
            rejected = true;
            invalid = true;
          }
        }

        if (propsRef.current.maxSize && file.size > propsRef.current.maxSize) {
          rejectionMessage = "File too large";
          propsRef.current.onFileReject?.(file, rejectionMessage);
          rejected = true;
          invalid = true;
        }

        if (!rejected) {
          acceptedFiles.push(file);
        } else {
          rejectedFiles.push({ file, message: rejectionMessage });
        }
      }

      if (invalid) {
        store.dispatch({ variant: "SET_INVALID", invalid });
        setTimeout(() => {
          store.dispatch({ variant: "SET_INVALID", invalid: false });
        }, 2000);
      }

      if (acceptedFiles.length > 0) {
        store.dispatch({ variant: "ADD_FILES", files: acceptedFiles });

        if (isControlled && propsRef.current.onValueChange) {
          const currentFiles = Array.from(
            store.getState().files.values()
          ).map((f) => f.file);
          propsRef.current.onValueChange([...currentFiles]);
        }

        if (propsRef.current.onAccept) {
          propsRef.current.onAccept(acceptedFiles);
        }

        for (const file of acceptedFiles) {
          propsRef.current.onFileAccept?.(file);
        }

        if (propsRef.current.onUpload) {
          requestAnimationFrame(() => {
            onFilesUpload(acceptedFiles);
          });
        }
      }
    },
    [store, isControlled, propsRef]
  );

  const onFilesUpload = React.useCallback(
    async (files) => {
      try {
        for (const file of files) {
          store.dispatch({ variant: "SET_PROGRESS", file, progress: 0 });
        }

        if (propsRef.current.onUpload) {
          await propsRef.current.onUpload(files, {
            onProgress: (file, progress) => {
              store.dispatch({
                variant: "SET_PROGRESS",
                file,
                progress: Math.min(Math.max(0, progress), 100),
              });
            },
            onSuccess: (file) => {
              store.dispatch({ variant: "SET_SUCCESS", file });
            },
            onError: (file, error) => {
              store.dispatch({
                variant: "SET_ERROR",
                file,
                error: error.message ?? "Upload failed",
              });
            },
          });
        } else {
          for (const file of files) {
            store.dispatch({ variant: "SET_SUCCESS", file });
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";
        for (const file of files) {
          store.dispatch({
            variant: "SET_ERROR",
            file,
            error: errorMessage,
          });
        }
      }
    },
    [store, propsRef.current.onUpload]
  );

  const onInputChange = React.useCallback(
    (event) => {
      const files = Array.from(event.target.files ?? []);
      onFilesChange(files);
      event.target.value = "";
    },
    [onFilesChange]
  );

  const RootPrimitive = asChild ? Slot : "div";

  return (
    <DirectionContext.Provider value={dir}>
      <StoreContext.Provider value={store}>
        <FileUploadContext.Provider value={contextValue}>
          <RootPrimitive
            data-disabled={disabled ? "" : undefined}
            data-slot="file-upload"
            dir={dir}
            {...rootProps}
            ref={forwardedRef}
            className={cn("relative flex flex-col gap-2", className)}
          >
            {children}
            <input
              type="file"
              id={inputId}
              aria-labelledby={labelId}
              aria-describedby={dropzoneId}
              ref={inputRef}
              tabIndex={-1}
              accept={accept}
              name={name}
              disabled={disabled}
              multiple={multiple}
              required={required}
              className="sr-only"
              onChange={onInputChange}
            />
            <span id={labelId} className="sr-only">
              {label ?? "File upload"}
            </span>
          </RootPrimitive>
        </FileUploadContext.Provider>
      </StoreContext.Provider>
    </DirectionContext.Provider>
  );
});

FileUploadRoot.displayName = ROOT_NAME;

export function FileUploadDropzone({
  children,
  className,
  ...dropzoneProps
}) {
  const { inputId, dropzoneId, disabled, dir } = useFileUploadContext(DROPZONE_NAME);
  const store = useStoreContext(DROPZONE_NAME);

  const onDragEnter = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      store.dispatch({ variant: "SET_DRAG_OVER", dragOver: true });
    },
    [store]
  );

  const onDragLeave = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!event.currentTarget.contains(event.relatedTarget)) {
        store.dispatch({ variant: "SET_DRAG_OVER", dragOver: false });
      }
    },
    [store]
  );

  const onDragOver = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );

  const onDrop = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      store.dispatch({ variant: "SET_DRAG_OVER", dragOver: false });

      const files = Array.from(event.dataTransfer.files);
      if (files.length > 0) {
        const input = document.getElementById(inputId);
        if (input) {
          const dataTransfer = new DataTransfer();
          for (const file of files) {
            dataTransfer.items.add(file);
          }
          input.files = dataTransfer.files;
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    },
    [store, inputId]
  );

  const onClick = React.useCallback(
    (event) => {
      if (disabled) return;
      const input = document.getElementById(inputId);
      if (input) {
        input.click();
      }
    },
    [inputId, disabled]
  );

  const dragOver = useStore((state) => state.dragOver);
  const invalid = useStore((state) => state.invalid);

  return (
    <div
      data-drag-over={dragOver ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
      data-slot="file-upload-dropzone"
      id={dropzoneId}
      dir={dir}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
      {...dropzoneProps}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-gray-400 data-[drag-over]:border-blue-500 data-[drag-over]:bg-blue-50 data-[invalid]:border-red-500 data-[invalid]:bg-red-50",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {children}
    </div>
  );
}

FileUploadDropzone.displayName = DROPZONE_NAME;

export function FileUploadTrigger({
  children,
  className,
  ...triggerProps
}) {
  const { inputId, disabled } = useFileUploadContext(TRIGGER_NAME);

  const onClick = React.useCallback(
    (event) => {
      if (disabled) return;
      const input = document.getElementById(inputId);
      if (input) {
        input.click();
      }
    },
    [inputId, disabled]
  );

  return (
    <button
      type="button"
      data-slot="file-upload-trigger"
      onClick={onClick}
      disabled={disabled}
      {...triggerProps}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

FileUploadTrigger.displayName = TRIGGER_NAME;

export function FileUploadList({ children, className, ...listProps }) {
  const { listId } = useFileUploadContext(LIST_NAME);
  const files = useStore((state) => Array.from(state.files.values()));

  if (files.length === 0) return null;

  return (
    <div
      id={listId}
      data-slot="file-upload-list"
      {...listProps}
      className={cn("flex flex-col gap-2", className)}
    >
      {files.map((fileState) => (
        <FileUploadItem key={fileState.file.name} file={fileState.file}>
          {children}
        </FileUploadItem>
      ))}
    </div>
  );
}

FileUploadList.displayName = LIST_NAME;

export function FileUploadItem({ children, file, className, ...itemProps }) {
  const { disabled } = useFileUploadContext(ITEM_NAME);

  return (
    <FileItemContext.Provider value={{ file }}>
      <div
        data-slot="file-upload-item"
        data-disabled={disabled ? "" : undefined}
        {...itemProps}
        className={cn(
          "flex items-center gap-3 rounded-lg border border-gray-200 p-3",
          className
        )}
      >
        {children}
      </div>
    </FileItemContext.Provider>
  );
}

FileUploadItem.displayName = ITEM_NAME;

function getFileIcon(file) {
  if (file.type.startsWith("image/")) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
        <FileIcon className="h-5 w-5 text-gray-600" />
      </div>
    );
  }
  
  if (file.type.startsWith("video/")) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100">
        <FileVideoIcon className="h-5 w-5 text-blue-600" />
      </div>
    );
  }
  
  if (file.type.startsWith("audio/")) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded bg-green-100">
        <FileAudioIcon className="h-5 w-5 text-green-600" />
      </div>
    );
  }
  
  if (file.type.includes("text") || file.type.includes("document")) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded bg-yellow-100">
        <FileTextIcon className="h-5 w-5 text-yellow-600" />
      </div>
    );
  }
  
  if (file.type.includes("zip") || file.type.includes("archive")) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-100">
        <FileArchiveIcon className="h-5 w-5 text-purple-600" />
      </div>
    );
  }
  
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
      <FileIcon className="h-5 w-5 text-gray-600" />
    </div>
  );
}

export function FileUploadItemPreview({ children, className, ...previewProps }) {
  const { file } = React.useContext(FileItemContext);
  if (!file) return null;

  return (
    <div
      data-slot="file-upload-item-preview"
      {...previewProps}
      className={cn("flex-shrink-0", className)}
    >
      {children ?? getFileIcon(file)}
    </div>
  );
}

FileUploadItemPreview.displayName = ITEM_PREVIEW_NAME;

const FileItemContext = React.createContext(null);

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function FileUploadItemMetadata({ children, className, ...metadataProps }) {
  const { file } = React.useContext(FileItemContext);
  if (!file) return null;

  return (
    <div
      data-slot="file-upload-item-metadata"
      {...metadataProps}
      className={cn("flex flex-1 flex-col", className)}
    >
      {children ?? (
        <>
          <span className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </span>
          <span className="text-xs text-gray-500">
            {formatFileSize(file.size)}
          </span>
        </>
      )}
    </div>
  );
}

FileUploadItemMetadata.displayName = ITEM_METADATA_NAME;

export function FileUploadItemProgress({ children, className, ...progressProps }) {
  const { file } = React.useContext(FileItemContext);
  if (!file) return null;

  const fileState = useStore((state) => state.files.get(file));
  if (!fileState) return null;

  const progress = fileState.progress;
  const status = fileState.status;

  if (status === "idle" || status === "success") return null;

  return (
    <div
      data-slot="file-upload-item-progress"
      {...progressProps}
      className={cn("w-full", className)}
    >
      {children ?? (
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

FileUploadItemProgress.displayName = ITEM_PROGRESS_NAME;

export function FileUploadItemDelete({ children, className, ...deleteProps }) {
  const { file } = React.useContext(FileItemContext);
  const store = useStoreContext(ITEM_DELETE_NAME);

  const onClick = React.useCallback(
    (event) => {
      event.stopPropagation();
      if (file) {
        store.dispatch({ variant: "REMOVE_FILE", file });
      }
    },
    [store, file]
  );

  return (
    <button
      type="button"
      data-slot="file-upload-item-delete"
      onClick={onClick}
      {...deleteProps}
      className={cn(
        "ml-auto rounded p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100",
        className
      )}
    >
      {children ?? (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
}

FileUploadItemDelete.displayName = ITEM_DELETE_NAME;

export function FileUploadClear({ children, className, ...clearProps }) {
  const store = useStoreContext(CLEAR_NAME);
  const files = useStore((state) => Array.from(state.files.values()));

  const onClick = React.useCallback(
    (event) => {
      event.stopPropagation();
      store.dispatch({ variant: "CLEAR" });
    },
    [store]
  );

  if (files.length === 0) return null;

  return (
    <button
      type="button"
      data-slot="file-upload-clear"
      onClick={onClick}
      {...clearProps}
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50",
        className
      )}
    >
      {children ?? "Clear all"}
    </button>
  );
}

FileUploadClear.displayName = CLEAR_NAME;

// Export compound components
export const FileUpload = Object.assign(FileUploadRoot, {
  Dropzone: FileUploadDropzone,
  Trigger: FileUploadTrigger,
  List: FileUploadList,
  Item: FileUploadItem,
  ItemPreview: FileUploadItemPreview,
  ItemMetadata: FileUploadItemMetadata,
  ItemProgress: FileUploadItemProgress,
  ItemDelete: FileUploadItemDelete,
  Clear: FileUploadClear,
});

export default FileUpload;