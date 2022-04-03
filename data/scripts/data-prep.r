library(tidyverse)
library(janitor)

col_names <- c('year','make','model','vehicle_class','engine_size','cylinders','transmission','fuel_type','fc_city_l100','fc_hwy_l100','fc_comb_l100','fc_comb_mpg','co2_emissions','co2_rating','smog_rating')
# col_types <- c('fc_city_l100' = 'd', 'fc_hwy_l100' = 'd', 'fc_comb_l100' = 'd', .default = 'c')

# load files
setwd('fuel-ratings/')
fc <- list.files() %>% 
  map_df(read_csv, skip = 2, col_names = col_names, col_types = c(.default = 'c')) %>% 
  select(year, make, model, fuel_type, ends_with('_l100')) %>% 
  # bit of tidying up...
  filter(!is.na(fuel_type))

# save to csv
write_csv(fc, '../gas-cost-calculator-data.csv')


setwd('..')

