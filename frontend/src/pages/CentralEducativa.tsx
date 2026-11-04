import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { Container, DemoBadge, InDevelopment, SectionHeading } from "@/components/common/Primitives";
import { EDU_MODULES, LEARNING_TRAILS, type LearningModule } from "@/data/content";

function ModuleCard({ m, prefix }: { m: LearningModule; prefix: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-6 shadow-sm transition-shadow duration-200 hover:shadow-md" data-testid={`${prefix}-${m.id}`}>
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-high text-primary">
          <Icon name={m.icon} size={26} />
        </div>
        <span className="rounded-full bg-amber-verdict-container px-2.5 py-0.5 font-heading text-label-sm text-amber-verdict">Em desenvolvimento</span>
      </div>
      <h3 className="font-heading text-title-md text-on-surface">{m.title}</h3>
      <p className="text-body-sm leading-relaxed text-on-surface-variant">{m.description}</p>
    </div>
  );
}

export default function CentralEducativa() {
  return (
    <div data-testid="educativa-page">
      <PageHero
        testid="educativa-hero"
        tag={{ icon: "local_library", label: "Central Educativa" }}
        title="Biblioteca para entender antes de decidir."
        description="Conteúdos temáticos e descomplicados sobre imunidade, vacinas, medicamentos e mecanismos biológicos fundamentais."
        crumbs={[{ label: "Central Educativa" }]}
      >
        <DemoBadge label="Área em desenvolvimento" className="mt-1" />
      </PageHero>

      <section className="py-14">
        <Container className="flex flex-col gap-6">
          <SectionHeading tag={{ icon: "auto_stories", label: "Biblioteca temática" }} title="Módulos previstos" description="Estrutura inicial dos temas. Os textos serão publicados após revisão das fontes." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {EDU_MODULES.map((m) => <ModuleCard key={m.id} m={m} prefix="edu-module" />)}
          </div>
        </Container>
      </section>

      <section id="trilhas" className="scroll-mt-24 bg-surface-container-low/70 py-14" data-testid="trilhas-section">
        <Container className="flex flex-col gap-6">
          <SectionHeading tag={{ icon: "route", label: "Trilhas de Autonomia" }} title="Trilhas de Autonomia" description="Módulos didáticos curtos, com linguagem acolhedora, organizados por perfil." />
          <div className="grid gap-4 md:grid-cols-3">
            {LEARNING_TRAILS.map((m) => <ModuleCard key={m.id} m={m} prefix="trail" />)}
          </div>
          <InDevelopment
            testid="educativa-in-development"
            title="O que está sendo preparado"
            description="A Central Educativa será conectada aos casos da Central de Investigações, para que cada pista leve a um conteúdo de aprofundamento."
            items={["Textos curtos por tema, com fontes", "Glossário de termos científicos", "Ligação entre pistas e módulos", "Versões acessíveis (leitura simplificada)"]}
          />
        </Container>
      </section>
    </div>
  );
}
