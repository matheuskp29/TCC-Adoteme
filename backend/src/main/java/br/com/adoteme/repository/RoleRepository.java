package br.com.adoteme.repository;

import br.com.adoteme.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByNome(String nome);
}
