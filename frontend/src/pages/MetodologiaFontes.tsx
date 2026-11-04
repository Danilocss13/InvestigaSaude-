import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { Container, InDevelopment, SectionHeading } from "@/components/common/Primitives";
import { VerdictBadge } from "@/components/cases/CaseMeta";
import { INSTITUTIONS } from "@/data/content";
import { VERDICTS } from "@/data/verdicts";

const EVIDENCE_LEVELS = [
  { icon: "chat_bubble", title: "Relatos e opiniões", text: "Depoimentos pessoais e opiniões isoladas. Úteis para levantar perguntas, não para concluir." },
  { icon: "visibility", title: "Estudos observacionais", text: "Observam grupos de pessoas sem intervir. Podem mostrar associações, mas não necessariamente causa." },
  { icon: "lab_research", title: "Ensaios clínicos", text: "Testam uma intervenção de forma planejada, idealmente com grupo de comparação e sorteio." },
  { icon: "auto_stories", title: "Revisões sistemáticas", text: "Reúnem e avaliam o conjunto dos estudos disponíveis sobre uma pergunta." },
];

const PRINCIPLES = [
  "Toda afirmação factual deve apontar para uma fonte identificável.",
  "Conclusões não devem ser mais categóricas do que as fontes permitem.",
  "Distinguir informação falsa, sem evidência suficiente e fora de contexto.",
  "Cenários fictícios são sempre identificados como tal.",
  "Referências ainda não conferidas são marcadas como \"a revisar\".",
];

export default function MetodologiaFontes() {
  return (
    <div data-testid="metodologia-page">
      <PageHero
        testid="metodologia-hero"
        tag={{ icon: "menu_book", label: "Metodologia e Fontes" }}
        title="Como os casos são construídos e classificados."
        description="Critérios editoriais, níveis de evidência e instituições de referência que orientam as investigações do InvestigaSaúde."
        crumbs={[{ label: "Metodologia e Fontes" }]}
      />

      <section className="py-14">
        <Container className="grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-4 rounded-2xl bg-surface-container-lowest p-6 shadow-sm lg:col-span-5" data-testid="metodologia-principles">
            <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Princípios editoriais</span>
            <ul className="flex flex-col gap-3">
              {PRINCIPLES.map((p) => (
                <li key={p} className="flex items-start gap-2 text-body-md text-on-surface">
                  <Icon name="check_circle" size={20} className="mt-0.5 text-secondary" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-7" data-testid="metodologia-verdicts">
            <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Critérios de classificação</span>
            <div className="grid gap-3 sm:grid-cols-2">
              {VERDICTS.map((v) => (
                <div key={v.id} className="flex flex-col gap-2 rounded-2xl bg-surface-container-lowest p-5 shadow-sm" data-testid={`criteria-${v.id}`}>
                  <VerdictBadge verdict={v.id} />
                  <p className="text-body-sm text-on-surface-variant">{v.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-container-low/70 py-14" data-testid="metodologia-evidence">
        <Container className="flex flex-col gap-6">
          <SectionHeading tag={{ icon: "stacked_bar_chart", label: "Níveis de evidência" }} title="Nem toda informação tem o mesmo peso" description="Uma visão simplificada, para fins didáticos, de como diferentes tipos de fonte contribuem para uma conclusão." />
          <div className="relative grid gap-4 md:grid-cols-4">
            {EVIDENCE_LEVELS.map((l, i) => (
              <div key={l.title} className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-container-high text-primary">
                    <Icon name={l.icon} size={24} />
                  </div>
                  <span className="font-mono text-[12px] font-semibold text-tertiary">Nível {i + 1}</span>
                </div>
                <h3 className="font-heading text-title-md text-on-surface">{l.title}</h3>
                <p className="text-body-sm text-on-surface-variant">{l.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14" data-testid="metodologia-institutions">
        <Container className="flex flex-col gap-6">
          <SectionHeading tag={{ icon: "account_balance", label: "Instituições de referência" }} title="Onde buscamos informação" description="Referências de consulta. O projeto não possui vínculo, parceria ou endosso dessas instituições." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INSTITUTIONS.map((inst) => (
              <a key={inst.id} href={inst.url} target="_blank" rel="noopener noreferrer" data-testid={`metodologia-institution-${inst.id}`} className="group flex flex-col gap-2 rounded-xl bg-surface-container-low p-5 transition-colors hover:bg-surface-container">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name={inst.icon} size={22} />
                  <span className="font-heading text-label-lg font-bold">{inst.name}</span>
                  <Icon name="open_in_new" size={14} className="ml-auto" />
                </div>
                <span className="font-heading text-label-sm uppercase text-tertiary">{inst.tag}</span>
                <p className="text-body-sm text-on-surface-variant">{inst.description}</p>
              </a>
            ))}
          </div>
          <InDevelopment
            testid="metodologia-in-development"
            title="Processo de curadoria e revisão"
            description="O fluxo de revisão das referências e dos casos ainda será definido pela equipe do projeto."
            items={["Definição dos revisores responsáveis", "Registro da data de revisão de cada caso", "Política de correção de conteúdo", "Canal para sugestões e erratas"]}
          />
        </Container>
      </section>

      <section id="termos" className="scroll-mt-24 pb-16" data-testid="termos-section">
        <Container>
          <div className="flex flex-col gap-3 rounded-3xl bg-surface-container-lowest p-8 shadow-sm md:p-10">
            <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Termos de Uso Educacional</span>
            <h2 className="font-heading text-headline-md text-on-surface">Uso exclusivamente educativo</h2>
            <p className="text-body-md text-on-surface-variant">
              O InvestigaSaúde tem finalidade didática: treinar a leitura crítica de informações sobre saúde. Os casos desta versão são
              demonstrativos e baseados em cenários fictícios. Nenhum conteúdo substitui diagnóstico, orientação ou acompanhamento de
              profissional de saúde. Diante de sintomas ou dúvidas sobre tratamentos, procure uma Unidade Básica de Saúde.
            </p>
            <p className="text-body-sm text-on-surface-variant">Texto provisório — a versão definitiva dos termos será elaborada pela equipe do projeto.</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
