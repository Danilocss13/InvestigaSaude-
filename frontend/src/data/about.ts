/* Conteúdo institucional do projeto — fonte: documento "InvestigaSaúde Resumo" enviado pela equipe. */

export const ABOUT_PROBLEM = [
  "A internet e as redes sociais facilitaram o acesso a informações sobre saúde, mas também aumentaram a circulação de conteúdos falsos, enganosos ou sem comprovação científica.",
  "Informações sobre sintomas, doenças, medicamentos, tratamentos, alimentação e prevenção podem ser compartilhadas fora de contexto ou apresentadas como fatos mesmo quando não possuem evidências confiáveis.",
  "Esse cenário pode contribuir para comportamentos prejudiciais, como automedicação, autodiagnóstico, abandono de tratamentos ou adoção de métodos sem comprovação, principalmente quando uma pessoa acredita que uma informação encontrada na internet é verdadeira sem verificar sua origem.",
];

export const ABOUT_RISKS = ["Automedicação", "Autodiagnóstico", "Abandono de tratamentos", "Métodos sem comprovação"];

export const ABOUT_PROPOSAL = [
  "Desenvolver uma plataforma web educativa e interativa para conscientizar a população sobre a importância de verificar informações relacionadas à saúde antes de acreditar, utilizar ou compartilhar determinado conteúdo.",
  "Seu objetivo é ensinar o usuário a analisar criticamente as informações que encontra na internet e reconhecer quando é necessário procurar um profissional qualificado.",
];

export const ABOUT_DISCLAIMER =
  "A plataforma não tem como objetivo substituir médicos, profissionais da saúde ou serviços de saúde, nem realizar diagnósticos.";

export const ABOUT_GENERAL_OBJECTIVE =
  "Desenvolver uma plataforma digital que promova a conscientização sobre a desinformação na área da saúde e ensine os usuários a verificar a confiabilidade de conteúdos antes de utilizá-los ou compartilhá-los, contribuindo para a prevenção de comportamentos como automedicação e autodiagnóstico.";

export const ABOUT_EXPECTED_RESULTS = [
  { icon: "help_center", text: "Questionar informações de saúde encontradas na internet" },
  { icon: "radar", text: "Reconhecer possíveis sinais de desinformação" },
  { icon: "verified_user", text: "Buscar fontes confiáveis" },
  { icon: "stethoscope", text: "Compreender quando deve procurar um profissional de saúde" },
];

export const ABOUT_AUDIENCE_INTRO =
  "A plataforma é destinada ao público adulto em geral, especialmente pessoas que:";

export const ABOUT_AUDIENCE = [
  { icon: "travel_explore", text: "Consomem frequentemente conteúdos relacionados à saúde na internet" },
  { icon: "rule", text: "Têm dificuldade para identificar informações falsas ou sem comprovação" },
  { icon: "manage_search", text: "Costumam buscar sintomas e possíveis doenças na internet" },
  { icon: "medication", text: "Possuem o hábito de se automedicar" },
  { icon: "forum", text: "Utilizam redes sociais e aplicativos de mensagens como fonte de informações sobre saúde" },
  { icon: "fact_check", text: "Possuem pouca familiaridade com métodos de verificação de informações" },
];

export const ABOUT_AUDIENCE_NOTE =
  "Embora o projeto tenha como público principal adultos, sua utilização poderá ser ampliada para diferentes faixas etárias e níveis de conhecimento tecnológico.";

export interface SdgItem {
  number: number;
  title: string;
  description: string;
  /** cor oficial do ODS (identidade visual da ONU) */
  color: string;
  main?: boolean;
}

export const ABOUT_SDGS: SdgItem[] = [
  {
    number: 3,
    title: "Saúde e Bem-Estar",
    description:
      "Principal relação do projeto: busca reduzir os impactos da desinformação sobre a saúde e incentivar decisões mais seguras.",
    color: "#4C9F38",
    main: true,
  },
  {
    number: 4,
    title: "Educação de Qualidade",
    description:
      "Promove educação em saúde e alfabetização informacional, ensinando as pessoas a avaliar criticamente o conteúdo que consomem.",
    color: "#C5192D",
  },
  {
    number: 10,
    title: "Redução das Desigualdades",
    description:
      "Busca tornar informações confiáveis e ferramentas de verificação mais acessíveis, independentemente do nível de conhecimento tecnológico ou educacional do usuário.",
    color: "#DD1367",
  },
];

export const ABOUT_INSTITUTION: { id: string; icon: string; label: string; value?: string }[] = [
  { id: "instituicao", icon: "account_balance", label: "Instituição", value: "Afya Montes Claros" },
  { id: "curso", icon: "school", label: "Curso", value: "Engenharia de Computação — 4º período" },
  { id: "disciplina", icon: "menu_book", label: "Disciplina", value: "Projeto de Extensão III" },
  { id: "professor", icon: "co_present", label: "Professor", value: "Herbert Souza" },
  { id: "contato", icon: "mail", label: "Contato" },
];

export const ABOUT_TEAM = ["Alexsandro O.", "Danilo C.", "George S.", "Iago C. S.", "João Victor C. M."];
