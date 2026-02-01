import type { RootState } from "../app/store";
import { useSelector } from "react-redux";
import DivTemplate from "../components/layout/DivTemplate";
import EmptyState from "../components/feedback/EmptyState";
import LoadingState from "../components/feedback/LoadingState";
import ErrorState from "../components/feedback/ErrorState";

export default function RenderStates({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  const metadata = useSelector(
    (state: RootState) => state.playlist.playlist?.metadata,
  );
  const isLoading = useSelector((state: RootState) => state.playlist.isLoading);
  const isFailed = useSelector((state: RootState) => state.playlist.isFailed);
  const error = useSelector((state: RootState) => state.playlist.error);

  if (!metadata || isLoading || isFailed) {
    return (
      <DivTemplate title={title} id={id}>
        {isLoading && <LoadingState />}
        {!metadata && !isLoading && !isFailed && <EmptyState />}
        {isFailed && <ErrorState error={error} />}
      </DivTemplate>
    );
  }

  return (
    <DivTemplate title={title} id={id}>
      {children}
    </DivTemplate>
  );
}
