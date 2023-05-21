import { Spin } from "antd";
import styles from "./styles.module.less";
import clsx from "clsx";

export default function FormWrapper({
  loading = false,
  theme = "primary",
  className = "",
  size = "default",
  children,
}) {
  return (
    <div
      className={clsx({
        [className]: true,
        [styles.formWrapper]: true,
        [styles.formWrapperIsLoading]: loading,
        [styles.themeSecondary]: theme === "secondary",
        [className]: true,
      })}
    >
      {loading && (
        <div className="spinWrapper">
          <Spin size={size as any} />
        </div>
      )}
      {children}
    </div>
  );
}
