import Grid from "./grid";

const ListingSection = ({ title, subtitle, questions = [], loading = false }) => {
  return (
    <section className="animate-fade-in space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-gray-500 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 sm:p-10 shadow-sm border border-white">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-qp-orange"></div>
          </div>
        ) : (
          <Grid questions={questions} />
        )}
      </div>
    </section>
  );
};

export default ListingSection;
