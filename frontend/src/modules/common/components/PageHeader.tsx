import React, { ReactNode } from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions
}) => {
  const router = useRouter();

  return (
    <Box mb={4}>
      {breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            if (isLast) {
              return (
                <Typography
                  key={item.label}
                  color="text.primary"
                  variant="body2"
                >
                  {item.label}
                </Typography>
              );
            }

            return (
              <Link
                key={item.label}
                color="inherit"
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.href) {
                    router.push(item.href);
                  }
                }}
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        {actions && (
          <Box>
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PageHeader; 