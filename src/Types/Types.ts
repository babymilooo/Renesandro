export interface taskImages {
  assigned_task_name: string;
  layer_name: string;
  images: string[];
  dimension: string;
  style: string;
  manual_prompts: string;
  gen_per_ref: number;
  flow: string;
}

export interface Task {
  id: string;
  task_name: string;
  dimension: string;
  template_id: string;
  image_layers: string[];
  text_layers: string[];
  amount: number;
  gen_type: string;
}

