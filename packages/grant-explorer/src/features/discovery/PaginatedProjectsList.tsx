import PlusIcon from "@heroicons/react/20/solid/PlusIcon";
import { LoadingRing } from "../common/Spinner";
import { ProjectCard, ProjectCardSkeleton } from "../common/ProjectCard";
import { ApplicationSummary } from "common/src/grantsStackDataClientContext";

interface PaginatedProjectsListProps {
  applications: ApplicationSummary[];
  isLoading: boolean;
  isLoadingMore: boolean;
  loadNextPage: () => void;
  hasMorePages: boolean;
  onAddApplicationToCart: (application: ApplicationSummary) => void;
  onRemoveApplicationFromCart: (application: ApplicationSummary) => void;
  applicationExistsInCart: (application: ApplicationSummary) => boolean;
}

export function PaginatedProjectsList({
  applications,
  isLoading,
  isLoadingMore,
  loadNextPage,
  hasMorePages,
  onAddApplicationToCart,
  onRemoveApplicationFromCart,
  applicationExistsInCart,
}: PaginatedProjectsListProps): JSX.Element {
  return (
    <>
      {applications.map((application) => (
        <ProjectCard
          key={application.applicationRef}
          application={application}
          inCart={applicationExistsInCart(application)}
          onAddToCart={() => onAddApplicationToCart(application)}
          onRemoveFromCart={() => onRemoveApplicationFromCart(application)}
        />
      ))}
      {isLoadingMore && (
        <>
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </>
      )}
      {!isLoading && hasMorePages && (
        <div className="flex items-center">
          <button
            className="rounded-3xl border border-white bg-[#F3F3F5] text-md font-medium px-5 py-3 flex items-center"
            disabled={isLoadingMore}
            onClick={() => loadNextPage()}
          >
            {isLoadingMore ? (
              <LoadingRing className="animate-spin w-5 h-5" />
            ) : (
              <>
                <PlusIcon className="w-5 h-5 mr-1" />
                <span>Load more</span>
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
