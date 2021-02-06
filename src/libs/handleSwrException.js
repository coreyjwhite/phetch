import Loading from "components/Loading";

export default function handleSwrException(data, error) {
  if (error) return <div>failed to load</div>;
  if (!data) return <Loading />;
}
